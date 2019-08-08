package org.fisco.bcos.controller;

import contract.InfoTable;
import org.fisco.bcos.web3j.crypto.Credentials;
import org.fisco.bcos.web3j.crypto.Keys;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.fisco.bcos.web3j.tuples.generated.Tuple2;
import org.fisco.bcos.web3j.tx.gas.StaticGasProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigInteger;

import static org.fisco.bcos.constants.GasConstants.GAS_LIMIT;
import static org.fisco.bcos.constants.GasConstants.GAS_PRICE;

@Component
public class Web3Controller {

    @Autowired
    private Web3j web3;

    @Autowired
    private IPFSConfig ipfs;

    //@Bean
    public void test() throws Exception {
        // 初始化Web3j对象
        BigInteger blockNumber = web3.getBlockNumber().send().getBlockNumber();
        System.out.println(blockNumber);

        // 初始化Credentials对象
        Credentials credentials = Credentials.create(Keys.createEcKeyPair());

        //ipfs上传和下载
        String resultHash = ipfs.upload();
        ipfs.download(resultHash);

        //部署合约
        InfoTable asset = InfoTable.deploy(web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT)).send();
//        String contractAddress = "0xcdcce60801c0a2e6bb534322c32ae528b9dec8d2";
        // 加载合约地址
//        InfoTable asset = InfoTable.load(contractAddress, web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT));
        TransactionReceipt resultInsert = asset.retailInsert("0","store",resultHash).send();

        System.out.println("retailInsert:"+resultInsert);
        Tuple2<byte[],byte[]> resultSelect = asset.retailSelect("0").send();
        System.out.println("retailSelect:"+new String(resultSelect.getValue1())+" "+new String(resultSelect.getValue2()));
    }

}
