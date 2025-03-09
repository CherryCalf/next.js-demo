package com.bh.tabletest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin
@RestController
public class TConterllor {

    @PostMapping("/t")
    public List<VO> t() {
        List<VO> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            list.add(new VO("name" + i, i, "address" + i, "key" + i));
        }
        return list;
    }
    @PostMapping("/t2")
    public List<VO> t2() {
        List<VO> list = new ArrayList<>();
        for (int i = 10; i < 100; i++) {
            list.add(new VO("name" + i, i, "address" + i, "key" + i));
        }
        return list;
    }
}
