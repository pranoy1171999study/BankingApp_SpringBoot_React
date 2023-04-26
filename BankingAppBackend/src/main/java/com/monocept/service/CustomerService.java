package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.monocept.entity.Accounts;
import com.monocept.entity.Bank;
import com.monocept.entity.Customer;

public interface CustomerService {
	public Customer save(Customer customer);
	public void deleteById(int id);
	public Optional<Customer> getById(int id);
	public List<Customer> findAll();
	public List<Accounts> findAllAccounts(int c_id);
	public Customer update(int cId, int accNo);
	public Customer getCustomerWithAccounts(int id);
	public Page<Customer> findAll(Pageable page);
}
