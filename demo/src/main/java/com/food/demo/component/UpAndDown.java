package com.food.demo.component;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;

import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multihash.Multihash;

@Component
public class UpAndDown {
	public void test() throws Exception {
		//创建节点
		IPFS ipfs =new IPFS("/ip4/127.0.0.1/tcp/5001");
		//初始化
		ipfs.refs.local();
		//添加文件并返回hash值
		NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper("hello.txt", "G'day world! IPFS rocks!".getBytes());
		MerkleNode addResult = ipfs.add(file).get(0);
	
		String resultJSON = addResult.toJSONString();
		JSONObject jsonResult = JSONObject.parseObject(resultJSON);

		String resultHash = jsonResult.getString("Hash");
		System.out.println(resultHash);
		
		//通过hash值查询文件内容
		Multihash filePointer = Multihash.fromBase58(resultHash);
		byte[] fileContents = ipfs.cat(filePointer);
		
		String result = new String(fileContents);
		System.out.println(result);
	}
}
