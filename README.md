# USDC Swap on Polygon with EIP-2612 Permit

This project demonstrates how to use the EIP-2612 `permit` functionality to perform a swap of USDC on the Polygon network using a decentralized exchange (DEX).

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Install dependencies:
    ```sh
    npm install
    ```

2. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PRIVATE_KEY=your_private_key
    POLYGON_RPC_URL=https://polygon-rpc.com
    ```



### Running the Script

To execute the swap script, run:

```sh
node index.js
```


## Script Overview
The script performs the following steps:

Setup: Initializes the necessary configurations, including the private key, Polygon RPC URL, wallet, and contract addresses.

Contract Initialization: Sets up the USDC token and DEX contracts. 

Permit Message Construction: Constructs the permit message with the required details.

Domain and Types Definition: Defines the domain separator and types for the permit message.

Signing the Permit Message: Signs the permit message using the wallet's private key.

Splitting the Signature: Splits the signature into its r, s, and v components.

Executing the Permit Transaction: Uses the permit signature to approve the DEX contract to spend USDC and perform the token swap.


## Important Notes
This script is configured to work with USDC on the Polygon mainnet.
Ensure you have sufficient USDC balance and MATIC for gas fees in your wallet.
