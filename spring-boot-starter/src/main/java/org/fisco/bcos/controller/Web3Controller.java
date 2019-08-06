package org.fisco.bcos.controller;

import org.fisco.bcos.web3j.protocol.Web3j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.math.BigInteger;

@Component
public class Web3Controller {

    @Autowired
    private Web3j web3;

    @Autowired
    private IPFSConfig ipfs;

    @Bean
    public void test() throws Exception {
        BigInteger blockNumber = web3.getBlockNumber().send().getBlockNumber();
        System.out.println(blockNumber);

        String resultHash = ipfs.upload();
        ipfs.download(resultHash);
    }

}
