package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import org.fisco.bcos.Component.Role;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

@RestController
@CrossOrigin
public class SuppRegisterController {

    @GetMapping("/roleDisplay")
    public String hello () {

        return "hello world";
    }

    @ResponseBody
    @PostMapping (value="/roleInsert",produces = "application/json;charset=UTF-8")
    public String getJSONData(@RequestBody Role role) throws Exception{

        switch(role.getRole()) {
            case "supp":
                System.out.println("supp");
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
        IPFS ipfs =new IPFS("/ip4/127.0.0.1/tcp/5001");
        ipfs.refs.local();
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper("hello.txt",toByteArray(role.getFile()));
        MerkleNode addResult = ipfs.add(file).get(0);

        String resultJSON = addResult.toJSONString();
        JSONObject jsonResult = JSONObject.parseObject(resultJSON);

        String resultHash = jsonResult.getString("Hash");
        System.out.println(resultHash);
        return "success";

    }

    public byte[] toByteArray (Object obj) {
        byte[] bytes = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            ObjectOutputStream oos = new ObjectOutputStream(bos);
            oos.writeObject(obj);
            oos.flush();
            bytes = bos.toByteArray ();
            oos.close();
            bos.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return bytes;
    }
}

