package com.monocept.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 100001)
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "port_gen")
	@Column(name = "c_id")
	int customerId;
	String fName;
	String lName;
	@Column(name = "total_bal")
	long totalBal;
	Role role; 
	
	@OneToMany(cascade = CascadeType.ALL) //perform same operation with the child as we apply on parent
	@JoinColumn(name="fk_c_id", referencedColumnName = "c_id")
	@JsonIgnore
	Set<Accounts> accounts = new HashSet<Accounts>();
//	Set<Tranjuctions> tranjuctions=new HashSet<Tranjuctions>();
	
	public Customer() {
		// TODO Auto-generated constructor stub
	}

	public Customer(String fName, String lName,Role role ) {
		super();
		this.fName = fName;
		this.lName = lName;
		this.role=role;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public long getTotalBal() {
		return totalBal;
	}

	public void setTotalBal(long totalBal) {
		this.totalBal = totalBal;
	}

	public Set<Accounts> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Accounts> accounts) {
		this.accounts = accounts;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

//	public Set<Tranjuctions> getTranjuctions() {
//		return tranjuctions;
//	}

//	public void setTranjuctions(Set<Tranjuctions> tranjuctions) {
//		this.tranjuctions = tranjuctions;
//	}
	
	
}
