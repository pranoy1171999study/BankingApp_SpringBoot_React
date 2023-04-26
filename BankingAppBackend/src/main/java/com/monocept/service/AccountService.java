package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.monocept.entity.Accounts;
import com.monocept.entity.Customer;

public interface AccountService {
	public Accounts save(Accounts acc);
	public void deleteById(int id);
	public Optional<Accounts> getById(int id);
	public List<Accounts> findAll();
	public List<Accounts> findAllByBankId(int bank_id);
	public String add(int bal,int cid, int bankId);
	public String update(int accid,int bal,int cid, int bankId);
	public List<Accounts> getCustomerWithAccounts(int cid);
	public List<Accounts> find10AccountsBySearchTerm(int term);
	public Page<Accounts> findAll(Pageable page);
	
}
