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

@Entity
public class Bank {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "b_id")
	int bankId;
	String fullName;
	String abbrevieation;
	
	@OneToMany(cascade = CascadeType.ALL ) //perform same operation with the child as we apply on parent
	@JoinColumn(name="fk_b_id", referencedColumnName = "b_id")
	@JsonIgnore
	Set<Accounts> accounts=new HashSet<Accounts>();
	
	
	public Bank() {
		// TODO Auto-generated constructor stub
	}
	public Bank(String fullName, String abbrevieation) {
		super();
		this.fullName = fullName;
		this.abbrevieation = abbrevieation;
	}
	public int getBankId() {
		return bankId;
	}
	public void setBankId(int bankId) {
		this.bankId = bankId;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getAbbrevieation() {
		return abbrevieation;
	}
	public void setAbbrevieation(String abbrevieation) {
		this.abbrevieation = abbrevieation;
	}
}
