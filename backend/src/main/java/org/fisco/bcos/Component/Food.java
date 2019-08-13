package org.fisco.bcos.Component;

import com.alibaba.fastjson.JSONObject;

public class Food {

    private String foodNum;
    private String suppId;
    private String transId;
    private String retailId;
    private String outDate;
    private String ingredient;
    private String original;
    private String foodImg;
    private String temp;

    public String getFoodNum() {
        return foodNum;
    }

    public void setFoodNum(String foodNum) {
        this.foodNum = foodNum;
    }

    public String getSuppId() {
        return suppId;
    }

    public void setSuppId(String suppId) {
        this.suppId = suppId;
    }

    public String getTransId() {
        return transId;
    }

    public void setTransId(String transId) {
        this.transId = transId;
    }

    public String getRetailId() {
        return retailId;
    }

    public void setRetailId(String retailId) {
        this.retailId = retailId;
    }

    public String getOutDate() {
        return outDate;
    }

    public void setOutDate(String outDate) {
        this.outDate = outDate;
    }

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public String getOriginal() {
        return original;
    }

    public void setOriginal(String original) {
        this.original = original;
    }

    public String getFoodImg() {
        return foodImg;
    }

    public void setFoodImg(String foodImg) {
        this.foodImg = foodImg;
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String resultJSON(Food food) {
        JSONObject returnResult = new JSONObject();

        returnResult.put("foodNum",food.getFoodNum());
        returnResult.put("suppId",food.getSuppId());
        returnResult.put("transId",food.getTransId());
        returnResult.put("retailId",food.getRetailId());
        returnResult.put("outDate",food.getOutDate());
        returnResult.put("ingredient",food.getIngredient());
        returnResult.put("original",food.getOriginal());
        returnResult.put("foodImg",food.getFoodImg());
        returnResult.put("temp",food.getTemp());

        return returnResult.toJSONString();
    }
}
