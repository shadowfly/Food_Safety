package org.fisco.bcos.controller;

import com.alibaba.fastjson.JSONObject;
import org.fisco.bcos.Component.RetailAdd;
import org.fisco.bcos.Component.SuppAdd;
import org.fisco.bcos.Component.ThreeParty;
import org.fisco.bcos.Component.TransAdd;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleAddController {

    @Autowired
    private Web3Config web3;

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/suppAdd",produces = "application/json;charset=UTF-8")
    public String suppAddInfo(@RequestBody SuppAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String suppId = foodInfo.getSuppId();
        String outDate = foodInfo.getOutDate();
        String ingredient = foodInfo.getIngredient();
        String origin = foodInfo.getOrigin();
        String foodImg = foodInfo.getFoodImg();
        web3.suppAdd(foodNum,suppId,outDate,ingredient,origin,foodImg);
        System.out.println("suppAdd");

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","suppAdd");

        return returnResult.toJSONString();

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/transAdd",produces = "application/json;charset=UTF-8")
    public String transAddInfo(@RequestBody TransAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String transId = foodInfo.getTransId();
        String temp = foodInfo.getTemp();
        web3.transAdd(foodNum,transId,temp);
        System.out.println("TransAdd");

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","transAdd");

        return returnResult.toJSONString();

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/retailAdd",produces = "application/json;charset=UTF-8")
    public String retailAddInfo(@RequestBody RetailAdd foodInfo) throws Exception{

        String foodNum = foodInfo.getFoodNum();
        String retailId = foodInfo.getRetailId();
        web3.retailAdd(foodNum,retailId);
        System.out.println("retailAdd");

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","retailAdd");

        return returnResult.toJSONString();

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/threePartyInsert",produces = "application/json;charset=UTF-8")
    public String threePartyInsert(@RequestBody ThreeParty threeParty) throws Exception{
        String threePartyId = threeParty.getThreePartyId();
        String threePartyName = threeParty.getThreePartyName();
        String threePartyImg = threeParty.getThreePartyImg();
        String company = threeParty.getCompany();
        String result = threeParty.getResult();

        web3.threePartyInsert(threePartyId,threePartyName,threePartyImg,company,result);
        System.out.println("threePartyInsert");

        JSONObject returnResult = new JSONObject();
        returnResult.put("msg","success");
        returnResult.put("method","threePartyInsert");

        return returnResult.toJSONString();
    }

}
