package com.monocept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.monocept.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	public List<Customer> findByCustomerId(int customerId);
}
