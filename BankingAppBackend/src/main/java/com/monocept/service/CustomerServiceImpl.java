package com.monocept.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.monocept.entity.Accounts;
import com.monocept.entity.Bank;
import com.monocept.entity.Customer;
import com.monocept.entity.Employee;
import com.monocept.entity.Project;
import com.monocept.repository.AccountRepository;
import com.monocept.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	CustomerRepository cRepo;
	@Autowired
	AccountRepository accRepo;

	@Override
	public Customer save(Customer customer) {
		// TODO Auto-generated method stub
		return cRepo.save(customer);
	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		cRepo.deleteById(id);
	}

	@Override
	public Optional<Customer> getById(int id) {
		// TODO Auto-generated method stub
		Optional<Customer> customer=cRepo.findById(id);		
		return customer;
	}

	@Override
	public List<Customer> findAll() {
		// TODO Auto-generated method stub
		return cRepo.findAll();
	}
	@Override
	public Page<Customer> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return cRepo.findAll( page);
	}

	@Override
	public List<Accounts> findAllAccounts(int c_id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public Customer update(int cId, int accNo) {
		Optional<Customer> cs=cRepo.findById(cId);
		Optional<Accounts> ac=accRepo.findById(accNo);
		if(!cs.isPresent()||!ac.isPresent()) {
			return null;
		}
		Customer customer = cs.get();
		Accounts account = ac.get();
		
		Set<Accounts> accounts = customer.getAccounts();
		accounts.add(account);
		customer.setAccounts(accounts);
		return customer;
	}

	@Override
	public Customer getCustomerWithAccounts(int cid) {
		Customer customer=cRepo.findById(cid).get();
		List<Accounts> accounts=accRepo.findAllByCid(customer);
		
		Set<Accounts> accSet=new HashSet<>();
		for(Accounts a:accounts) {
			accSet.add(a);
		}
		customer.setAccounts(accSet);
		return customer;
	}
}
