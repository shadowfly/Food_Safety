package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multihash.Multihash;
import org.fisco.bcos.Component.Role;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

@RestController
public class SuppRegisterController {

    @Autowired
    private IPFSConfig ipfs;

    @Autowired
    private Web3Config web3;

    @ResponseBody
    @PostMapping (value="/roleInsert",produces = "application/json;charset=UTF-8")
    public String getJSONData(@RequestBody Role role) throws Exception{
        String roleName = role.getRoleName();
        String roleId =role.getRoleId();
        String roleImg = role.getFile();
        String resultHash = ipfs.upload(roleImg);
        switch(role.getRole()) {
            case "supp":
                TransactionReceipt web3Result = web3.suppInsert(roleId,roleName,resultHash);
                System.out.println(web3Result);
                break;
            case "trans":
                System.out.println("trans");
                break;
            case "retail":
                System.out.println("retail");
                break;
            case "supervise":
                System.out.println("supervise");
                break;
        }


        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","@ResponseBody");
        returnResult.put("data",resultHash);

        return returnResult.toJSONString();

    }
}

