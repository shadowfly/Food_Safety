package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import org.fisco.bcos.Component.Role;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {

    @Autowired
    private IPFSConfig ipfs;

    @Autowired
    private Web3Config web3;

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping (value="/roleInsert",produces = "application/json;charset=UTF-8")
    public String postJSONData(@RequestBody Role role) throws Exception{
        String roleName = role.getRoleName();
        String roleId =role.getRoleId();
        String roleImg = role.getFile();
        String resultHash = ipfs.upload(roleImg);
        switch(role.getRole()) {
            case "supp":
                TransactionReceipt suppInsert = web3.suppInsert(roleId,roleName,resultHash);
                System.out.println(suppInsert);
                break;
            case "trans":
                TransactionReceipt transInsert = web3.transInsert(roleId,roleName,resultHash);
                System.out.println(transInsert);
                break;
            case "retail":
                TransactionReceipt retailInsert = web3.retailInsert(roleId,roleName,resultHash);
                System.out.println(retailInsert);
                break;
            case "supervise":
                TransactionReceipt threePartyInsert = web3.threePartyInsert(roleId,roleName,resultHash);
                System.out.println(threePartyInsert);
                break;
        }

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","roleInsert");
        returnResult.put("data",resultHash);

        return returnResult.toJSONString();

    }

}

