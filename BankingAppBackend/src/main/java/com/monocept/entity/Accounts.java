package com.monocept.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 10000001)
public class Accounts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "port_gen")
	@Column(name = "acc_id")
	int accNo;
	int balance;
	
	@ManyToOne
	@JoinColumn(name="fk_b_id")
	Bank bank=null;
	@ManyToOne
	@JoinColumn(name="fk_c_id")
	private Customer cid=null;
	
public Accounts(int balance, Bank bank, Customer cid) {
		super();
		this.balance = balance;
		this.bank = bank;
		this.cid = cid;
	}

//	Set<Tranjuctions> tranjuctions=new HashSet<Tranjuctions>();
	public Accounts() {
		// TODO Auto-generated constructor stub
		this.balance = 1000;
	}
	
	public Accounts( int balance ) {
		super();
		this.balance = balance;
	}
	public Customer getC_id() {
		return cid;
	}
	public void setC_id(Customer c_id) {
		this.cid = c_id;
	}
	public int getAccNo() {
		return accNo;
	}
	public void setAccNo(int accNo) {
		this.accNo = accNo;
	}
	public Bank getBank() {
		return bank;
	}
	public void setBank(Bank bank) {
		this.bank = bank;
	}
	public long getBalance() {
		return balance;
	}
	public boolean setBalance(int balance) {
		if(balance<0) return false;
		this.balance = balance;
		return true;
	}
//	public Set<Tranjuctions> getTranjuctions() {
//		return tranjuctions;
//	}
//	public void setTranjuctions(Set<Tranjuctions> tranjuctions) {
//		this.tranjuctions = tranjuctions;
//	}
	
	
	
	
}
