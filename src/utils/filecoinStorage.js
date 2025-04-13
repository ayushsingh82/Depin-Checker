import lighthouse from '@lighthouse-web3/sdk';

/**
 * Configuration for Lighthouse
 * You'll need to get an API key from https://lighthouse.storage/
 */
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY || 'YOUR_API_KEY_HERE';

/**
 * Uploads data to Filecoin using Lighthouse
 * 
 * @param {string} network - The DePIN network name (walrus, helium, akash)
 * @param {Object} data - The data to upload
 * @param {Object} options - Additional options
 * @param {boolean} options.encrypted - Whether to encrypt the data (default: false)
 * @param {string} options.accessToken - Access token for encryption (if encrypted is true)
 * @returns {Promise<{cid: string, url: string}>} - The CID and URL of the uploaded data
 */
export async function uploadToFilecoin(network, data, options = {}) {
  try {
    // Add metadata and timestamp
    const dataToUpload = {
      ...data,
      metadata: {
        network,
        type: 'depin-reputation-data',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    };

    // Convert to JSON string and then to Blob
    const jsonData = JSON.stringify(dataToUpload, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a File object from the Blob
    const fileName = `${network}-data-${Date.now()}.json`;
    const file = new File([blob], fileName, { type: 'application/json' });

    // Upload to Lighthouse
    let response;
    
    if (options.encrypted && options.accessToken) {
      // For encrypted uploads
      response = await lighthouse.uploadEncrypted(
        file,
        LIGHTHOUSE_API_KEY,
        options.accessToken,
        network // Used as the tag for the upload
      );
    } else {
      // For regular uploads
      response = await lighthouse.upload(
        file,
        LIGHTHOUSE_API_KEY,
        false, // Don't show progress for programmatic uploads
        network // Used as the tag for the upload
      );
    }

    if (!response.data || !response.data.Hash) {
      throw new Error('Upload failed: No CID returned');
    }

    const cid = response.data.Hash;
    const url = `https://gateway.lighthouse.storage/ipfs/${cid}`;

    console.log(`Successfully uploaded ${network} data to Filecoin with CID: ${cid}`);
    
    return {
      cid,
      url,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error uploading to Filecoin:`, error);
    throw error;
  }
}

/**
 * Retrieves data from Filecoin using Lighthouse
 * 
 * @param {string} cid - The CID of the data to retrieve
 * @param {Object} options - Additional options
 * @param {boolean} options.encrypted - Whether the data is encrypted (default: false)
 * @param {string} options.accessToken - Access token for decryption (if encrypted is true)
 * @returns {Promise<Object>} - The retrieved data
 */
export async function retrieveFromFilecoin(cid, options = {}) {
  try {
    if (options.encrypted && options.accessToken) {
      // For encrypted data
      const decryptedData = await lighthouse.fetchEncryptedFile(
        cid,
        options.accessToken
      );
      
      // Parse the decrypted data
      const text = await decryptedData.text();
      return JSON.parse(text);
    } else {
      // For regular data
      const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
      
      if (!response.ok) {
        throw new Error(`Failed to retrieve data: ${response.statusText}`);
      }
      
      return await response.json();
    }
  } catch (error) {
    console.error(`Error retrieving from Filecoin:`, error);
    throw error;
  }
}

/**
 * Gets all uploads for a specific DePIN network
 * 
 * @param {string} network - The DePIN network name (walrus, helium, akash)
 * @returns {Promise<Array>} - Array of uploads with their CIDs
 */
export async function getNetworkUploads(network) {
  try {
    const uploads = await lighthouse.getUploads(LIGHTHOUSE_API_KEY);
    
    // Filter uploads by the network tag
    return uploads.data.uploads.filter(upload => 
      upload.tag === network
    );
  } catch (error) {
    console.error(`Error getting uploads for ${network}:`, error);
    throw error;
  }
}

/**
 * Creates a batch upload job for multiple data points
 * 
 * @param {string} network - The DePIN network name
 * @param {Array<Object>} dataPoints - Array of data points to upload
 * @returns {Promise<Array>} - Array of upload results
 */
export async function batchUpload(network, dataPoints) {
  const results = [];
  
  for (const data of dataPoints) {
    try {
      const result = await uploadToFilecoin(network, data);
      results.push({
        success: true,
        data: result
      });
    } catch (error) {
      results.push({
        success: false,
        error: error.message,
        data
      });
    }
  }
  
  return results;
}

export default {
  uploadToFilecoin,
  retrieveFromFilecoin,
  getNetworkUploads,
  batchUpload
}; 