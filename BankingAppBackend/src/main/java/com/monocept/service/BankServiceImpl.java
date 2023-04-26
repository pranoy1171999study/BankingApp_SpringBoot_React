package com.monocept.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.monocept.entity.Accounts;
import com.monocept.entity.Bank;
import com.monocept.entity.Email;
import com.monocept.repository.AccountRepository;
import com.monocept.repository.BankRepository;

@Service
public class BankServiceImpl implements BankService{
	@Autowired
	BankRepository bankrepo;
	@Autowired
	AccountRepository accRepo;
	
	@Override
	public Bank save(Bank bank) {
		return bankrepo.save(bank);
	}

	@Override
	public void deleteById(int id) {
		// TODO Auto-generated method stub
		bankrepo.deleteById(id);
	}

	@Override
	public Optional<Bank> getById(int id) {
		// TODO Auto-generated method stub
		return bankrepo.findById(id);
	}

	@Override
	public List<Bank> findAll() {
		// TODO Auto-generated method stub
		return bankrepo.findAll();
	}
	@Override
	public Page<Bank> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return bankrepo.findAll( page);
	}

	@Override
	public List<Accounts> findAllAccounts(int Bank_id) {
		// TODO Auto-generated method stub
		return accRepo.findAllByBank(Bank_id);
	}
}
