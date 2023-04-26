package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import com.monocept.entity.Accounts;
import com.monocept.entity.OwnPage;
import com.monocept.entity.Tranjuctions;

public interface TranjuctionService {
	public Tranjuctions save(Tranjuctions tranjuctions);
	public void deleteById(int id);
	public Optional<Tranjuctions> getById(int id);
	public List<Tranjuctions> findAllByCid(int cid  );
	public List<Tranjuctions> findAll();
	public String transferMoney(int sender,int reciever,int amount);
	public OwnPage findAllByAccNoPage(int AccNo ,int pageNo,int size);
	public String selfDeposite(int id,int amount);
	public String selfWithdrawl(int id,int amount);
}
