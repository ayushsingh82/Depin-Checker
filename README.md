# 🌐 DePIN Checker

DePIN Checker is a decentralized reputation verification framework built as a Checker Subnet, designed for DePIN networks.  Our Checker validates and compares key network metrics across **Helium**, **Walrus**, and **Akash**, generating **verifiable and trustless reputation data**, permanently stored on **Filecoin**.

---

## 🚀 Why DePIN Checker?

With the exponential rise of DePIN networks, there's a growing need for **transparent**, **verifiable**, and **cross-network** reputation systems. Currently, each DePIN network measures performance in isolation, making it hard for developers, investors, and users to assess true network reliability.

**DePIN Checker** solves this by:
- Creating a unified verification layer across multiple DePINs
- Generating reputation scores based on real-time data
- Storing reputation reports immutably on Filecoin

---

## 🔍 What We Compare

We analyze and compare reputation-related metrics from the following DePINs:

| Network  | Parameters Considered                                  |
|----------|--------------------------------------------------------|
| Helium   | Uptime, hotspot density, packet transfers              |
| Walrus   | Node availability, data contribution, geo-location     |
| Akash    | Resource leasing reliability, uptime, provider ranking |

These data points are fetched via APIs, processed off-chain in the Checker subnet, and the final reputation scores are stored as **verifiable proofs** on Filecoin.

---

## 🛠️ How It Works

1. **Data Fetching**: Periodic scraping and API calls to Helium, Walrus, and Akash.
2. **Score Calculation**: Each node is scored based on uptime, reliability, contribution, and stability.
3. **Proof Generation**: Reputation proofs are generated and cryptographically signed.
4. **Filecoin Storage**: All reports are uploaded to Filecoin for transparency and auditability.
5. **Frontend Dashboard** : Displays reputation scores and visualizations.

---

## 📦 Tech Stack

- **Checker Subnet**: Custom module built for trustless validation
- **Filecoin/IPFS**: Permanent, decentralized storage of reputation data
- **Helium, Walrus, Akash APIs**: For metric extraction
- **Node.js/Python**: Backend data processing
- **Web3.Storage**: For easy Filecoin interactions

---

## 📈 Use Cases

- Developers can choose nodes from any DePIN network with proven track records
- Projects can incentivize high-performing nodes based on cross-network metrics
- Researchers and analysts can benchmark network performance fairly

---



