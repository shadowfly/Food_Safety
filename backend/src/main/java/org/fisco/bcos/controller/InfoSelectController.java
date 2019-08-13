package org.fisco.bcos.controller;

import org.fisco.bcos.Component.Food;
import org.fisco.bcos.Component.InfoSelect;
import org.fisco.bcos.Component.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class InfoSelectController {

    @Autowired
    private Web3Config web3;

    private Role role;

    private Food food;

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/suppSelect",produces = "application/json;charset=UTF-8")
    public String getSuppInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        role = web3.suppSelect(value);

        return role.resultJSON(role);

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/transSelect",produces = "application/json;charset=UTF-8")
    public String getTransInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        role = web3.transSelect(value);

        return role.resultJSON(role);

    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/retailSelect",produces = "application/json;charset=UTF-8")
    public String getRetailInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        role = web3.retailSelect(value);

        return role.resultJSON(role);
    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/superviseSelect",produces = "application/json;charset=UTF-8")
    public String getThreePartyInfo(@RequestBody InfoSelect info) throws Exception {

        String value = info.getValue();

        role = web3.threePartySelect(value);

        return role.resultJSON(role);
    }

    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/foodInfoDel",produces = "application/json;charset=UTF-8")
    public String foodInfoDel() throws Exception {

        return "delete food info successfully";
    }

    //TODO
    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="/pointThreeParty",produces = "application/json;charset=UTF-8")
    public String pointThreeParty() throws Exception {

        role = web3.pointThreeParty();

        return role.resultJSON(role);
    }

    //TODO
    @ResponseBody
    @CrossOrigin("http://localhost:3000")
    @PostMapping(value="foodSelect",produces = "application/json;charset=UTF-8")

    public String getFoodInfo(@RequestBody InfoSelect info) throws Exception {

        String foodNum = info.getValue();

        food = web3.foodSelect(foodNum);

        return food.resultJSON(food);

    }
}
