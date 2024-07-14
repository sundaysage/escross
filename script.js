const form = document.getElementById('escrow-form');
const projectNameInput = document.getElementById('project-name');
const amountInput = document.getElementById('amount');
const buyerAddressInput = document.getElementById('buyer-address');
const sellerAddressInput = document.getElementById('seller-address');
const statusElement = document.getElementById('escrow-status');

// Solana connection (replace with your provider setup)
const connection = new solanaWeb3.Connection('https://devnet.helius-rpc.com/?api-key=1ed75f8b-119f-4be1-8235-a74ffcda8046'); // Devnet connection

// Replace with your actual program ID and account (for demo purposes)
const programId = new solanaWeb3.PublicKey('YOUR_PROGRAM_ID');
const wallet = solanaWeb3.Keypair.generate(); // Replace with your wallet




// Simulate form validation (replace with actual validation logic)
form.addEventListener('submit', async (event) => {


const form = document.getElementById('escrow-form');
const projectNameInput = document.getElementById('project-name');
const amountInput = document.getElementById('amount');
const buyerAddressInput = document.getElementById('buyer-address');
const sellerAddressInput = document.getElementById('seller-address');
const statusElement = document.getElementById('escrow-status');

  event.preventDefault(); // Prevent default form submission

  if (projectNameInput.value && amountInput.value && buyerAddressInput.value && sellerAddressInput.value) {
    statusElement.textContent = `Creating escrow for "${projectNameInput.value}"...`;

    try {
      // Simulate contract interaction (replace with actual interaction using @solana/web3.js)
      const buyerSolAccount = new solanaWeb3.Account(solanaWeb3.Keypair.generate()); 
      const escrowAccount = new solanaWeb3.Account(solanaWeb3.Keypair.generate()); 

      // Replace with actual transaction instructions based on the contract
      const tx = await connection.transactionBuilder()
        .setFeePayer(wallet.publicKey)
        .add(
          solanaWeb3.SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: escrowAccount.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(100),
            space: 100, 
            programId: programId,
          })
        )
        .add(
          
          programId.createInstruction(
            'initializeEscrow', 
            {
              buyer: buyerAddressInput.value,
              seller: sellerAddressInput.value,
              amount: new solanaWeb3.LAMPORTS_PER_SOL * amountInput.value, 
            
            
              accounts: [
                wallet.publicKey, 
                escrowAccount.publicKey, 
                buyerSolAccount.publicKey, 
              ],
              programId: programId,
            }
          )
        )
        .build();

      
      await tx.partialSign(wallet);
      await connection.sendTransaction(tx);

      statusElement.textContent = 'Escrow created successfully!';
      form.reset(); 
      form.querySelector('button').disabled = true;  } catch (error) {
      console.error('Error creating escrow:', error);
      statusElement.textContent = 'Escrow creation failed. Please check the console for details.';
    }
  } else {
    statusElement.textContent = 'Please fill in all fields.';
  }
});


const video = document.getElementById('blinking-video');
video.classList.add('blink');
