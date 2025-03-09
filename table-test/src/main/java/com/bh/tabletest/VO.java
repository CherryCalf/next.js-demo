package com.bh.tabletest;

import lombok.*;


public class VO
{
    private String name;
    private int age;
    private String address;
    private String key;
    public VO() {}
    public VO(String name, int age, String address, String key) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
