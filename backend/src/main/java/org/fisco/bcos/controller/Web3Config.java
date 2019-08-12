package org.fisco.bcos.controller;

import org.fisco.bcos.Component.Role;
import org.fisco.bcos.contract.InfoTable;
import org.fisco.bcos.web3j.crypto.Credentials;
import org.fisco.bcos.web3j.crypto.Keys;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.fisco.bcos.web3j.tuples.generated.Tuple2;
import org.fisco.bcos.web3j.tx.gas.StaticGasProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.math.BigInteger;

import static org.fisco.bcos.constants.GasConstants.GAS_LIMIT;
import static org.fisco.bcos.constants.GasConstants.GAS_PRICE;

@Component
public class Web3Config {

    @Autowired
    private Web3j web3;

    @Autowired
    private IPFSConfig ipfs;

    private Role role;

    public InfoTable assetInit() throws Exception {
        // 初始化Web3j对象
        BigInteger blockNumber = web3.getBlockNumber().send().getBlockNumber();
        System.out.println(blockNumber);

        // 初始化Credentials对象
        Credentials credentials = Credentials.create(Keys.createEcKeyPair());

        //首次部署合约
        //InfoTable asset = InfoTable.deploy(web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT)).send();

        //根据地址加载合约
        String contractAddress = "0x6f5666c2073abbf49132096d436c29c644492077";
        InfoTable asset = InfoTable.load(contractAddress, web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT));

        return asset;

    }

    public TransactionReceipt suppInsert(String roleId,String roleName,String resultHash) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt suppInsert = asset.suppInsert(roleId,roleName,resultHash).send();
        return suppInsert;
    }

    public Role suppSelect (String roleId) throws Exception{

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.suppSelect(roleId).send();


        role.setRoleId(roleId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;
    }

}
