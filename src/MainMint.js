import { useState } from "react";
// Package that allows you to connect to blockchain easily; has alot of utility functions, alternative for web3.js, industry standard now
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import BitDoggosNFT from './BitDoggosNFT.json';
import ImageSwapper from "./NFTimages";


const BitDoggosNFTAddress = BitDoggosNFT.address;

const MainMint = ({ accounts, setAccounts}) => {
   const [mintAmount, setMintAmount] = useState(1);
   const isConnected = Boolean(accounts[0]);

   async function handleMint() {
      if(window.ethereum) {
         // provides a way for Ether to connect to the blockchain
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         // Signs transaction
         const signer = provider.getSigner();
         const contract = new ethers.Contract(
            BitDoggosNFTAddress,
            BitDoggosNFT.abi,
            signer
         );
         try {
            const response = await contract.mint(BigNumber.from(mintAmount), {
               value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
            });
            console.log("response: ", response);
         } catch(err) {
            console.log("error: ", err)
         }
      }
   }

   const handleDecrement = () => {
      if(mintAmount <= 1) return;
      setMintAmount(mintAmount - 1);
   };
   const handleIncrement = () => {
      if(mintAmount >= 3) return;
      setMintAmount(mintAmount + 1);
   };

   return (
      <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
         <Box width="520px">    
         <ImageSwapper accounts={accounts} setAccounts={setAccounts} />
         <div>
         <Text fontSize="48px" textShadow="0 5px #000000">Bit Doggos</Text>
            <Text 
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
            >The doggos are gathering together to save humanity from low crypto prices. Will they gather enough to succeed? Mint Bit Doggos to find out.</Text>
         </div>

         
         {isConnected ? (
            <div>
               <Flex align="center" justify="center">
                  <Button 
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  margin="0 15px" 
                  onClick={handleDecrement}>-</Button>
                  <Input 
                  readOnly
                  fontFamily="inherit"
                  width="100px"
                  height="40px"
                  textAlign="center"
                  paddingLeft="19px"
                  marginTop="10px"
                  type="number" value={mintAmount} />
                  <Button
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  margin="0 15px" 
                  onClick={handleIncrement}>+</Button>
               </Flex>
               <Button 
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  marginTop="10px" 
                  onClick={handleMint}>Purchase Now</Button>
                  {/* Mint Now */}
            </div>
         ) : (
            <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#D6517D"
            >You must be connected to purchase!</Text>
            // mint
         )}  
         </Box>
      </Flex>
   )
}

export default MainMint;