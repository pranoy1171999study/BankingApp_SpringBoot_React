package com.monocept.entity;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 10000001)
public class Tranjuctions {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "port_gen")
	@Column(name = "tr_id")
	int trId;
	int sender;
	int reciever;
	long amount;
	Timestamp time =  new Timestamp(System.currentTimeMillis());
	
	public Tranjuctions() {
		// TODO Auto-generated constructor stub
	}
	public Tranjuctions(int sender, int reciever, long amount) {
		super();
		this.sender = sender;
		this.reciever = reciever;
		this.amount = amount;
	}
	public int getTrId() {
		return trId;
	}
	public void setTrId(int trId) {
		this.trId = trId;
	}
	public int getSender() {
		return sender;
	}
	public void setSender(int sender) {
		this.sender = sender;
	}
	public int getReciever() {
		return reciever;
	}
	public void setReciever(int reciever) {
		this.reciever = reciever;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public Timestamp getTime() {
		return time;
	}
	public void setTime(Timestamp time) {
		this.time = time;
	}
	
	
}
