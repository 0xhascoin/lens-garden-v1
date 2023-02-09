// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract LensGardenNFT is ERC721 {
    event NewNFTMinted(address sender, uint256 tokenId);
    event AlreadyMinted(address sender, bool val);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => bool) senderHasMinted;

    constructor() ERC721("Lens Garden", "LG") {
        console.log("This is my NFT contract constructor().");
    }

    function checkIfAlreadyMinted() public returns (bool) {
        if (senderHasMinted[msg.sender]) {
            emit AlreadyMinted(msg.sender, true);
            return true;
        } else {
            return false;
        }
    }

    function compareStrings(
        string memory a,
        string memory b
    ) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function makeAnNft() public {
        if (!senderHasMinted[msg.sender]) {
            // Get the current tokenId, starts at 0.
            uint256 newItemId = _tokenIds.current();

            // Mint the Nft to the sender using msg.sender.
            _safeMint(msg.sender, newItemId);

            senderHasMinted[msg.sender] = true;

            // Return the NFT's metadata.
            tokenURI(newItemId);

            // Increment the counter for when the next NFT is minted.
            _tokenIds.increment();

            emit NewNFTMinted(msg.sender, newItemId);
        } else {
            emit AlreadyMinted(msg.sender, true);
        }
    }

    // Set the NFTs metadata
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(_exists(_tokenId));
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            _tokenId,
            msg.sender
        );
        return "https://jsonkeeper.com/b/LXG1";
    }
}
