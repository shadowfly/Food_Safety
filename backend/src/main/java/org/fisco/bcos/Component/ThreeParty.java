package org.fisco.bcos.Component;

import com.alibaba.fastjson.JSONObject;

public class ThreeParty {

    private String threePartyId;
    private String threePartyName;
    private String threePartyImg;
    private String company;
    private String result;

    public String getThreePartyId() {
        return threePartyId;
    }

    public void setThreePartyId(String threePartyId) {
        this.threePartyId = threePartyId;
    }

    public String getThreePartyName() {
        return threePartyName;
    }

    public void setThreePartyName(String threePartyName) {
        this.threePartyName = threePartyName;
    }

    public String getThreePartyImg() {
        return threePartyImg;
    }

    public void setThreePartyImg(String threePartyImg) {
        this.threePartyImg = threePartyImg;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

}
