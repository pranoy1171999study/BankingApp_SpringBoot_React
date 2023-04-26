package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.monocept.entity.Accounts;
import com.monocept.entity.Bank;

@Repository
public interface BankRepository extends JpaRepository<Bank, Integer>{
	
}
