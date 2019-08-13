package org.fisco.bcos.Component;

import com.alibaba.fastjson.JSONObject;

public class Role {

    private String roleId;
    private String roleName;
    private String role;
    private String file;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String resultJSON(Role role) {
        JSONObject returnResult = new JSONObject();
        returnResult.put("roleId",role.getRoleId());
        returnResult.put("roleName",role.getRoleName());
        returnResult.put("roleImg",role.getFile());

        return returnResult.toJSONString();
    }
}
