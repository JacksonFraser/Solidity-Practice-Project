/**
 * Determines to compiler version
 */
pragma solidity ^0.4.17;

/**
 * contract is basically just the same as a class. 
 * This is the thing we deploy to the network
 */
contract HelloWorld {
    
   /**
    * An instance variable same as Java
    */
    string public message;
    
    
   /**
    * A constructor for Inbox. Similar to OO constructors. 
    * This will be invoked automatically when we deploy this contract to the blockchain
    */
    function HelloWorld(string initialMessage) public {
        message = initialMessage;
    }
    
    
   /**
    * A setter for message
    * 
    * Things to note: 
    * - Setters can modify data (on the blockchain) 
    * - Takes time to execute (has to be mined)
    * - Returns the transaction hash 
    * - Costs money! (eth)
    */
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    
   /**
    * A getter for message. 
    * 
    * The important thing to note here is the 'view' keyword.
    * view signifies we aren't modifying any data (and we will be prevented from doing so)
    * 
    * Things to note:
    * - Getters can't modify data 
    * - Runs instantly (doesn't have to be mined)
    * - Is free! (yay)
    * 
    * Calling a getter method runs instantly (we don't have to wait for mining) and is free to do
    * 
    * It's also important to note that in Solidity, any public instance variable will have a getter method by default on compilation. 
    * Therefore, this is redundant
    */    
    function getMessage() public view returns (string) {
        return message;
    }
}