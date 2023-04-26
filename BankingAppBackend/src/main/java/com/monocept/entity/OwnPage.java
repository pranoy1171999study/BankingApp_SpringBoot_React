package com.monocept.entity;

import java.util.List;

public class OwnPage {
	int totalPages;
	int currentPage;
	int totalEntries;
	List<?> content;
	boolean success;
	public OwnPage() {
		// TODO Auto-generated constructor stub
	}
	public OwnPage(int totalPages, int currentPage, int totalEntries, List<?> content) {
		super();
		this.totalPages = totalPages;
		this.currentPage = currentPage;
		this.totalEntries = totalEntries;
		this.content = content;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getTotalEntries() {
		return totalEntries;
	}
	public void setTotalEntries(int totalEntries) {
		this.totalEntries = totalEntries;
	}
	public List<?> getContent() {
		return content;
	}
	public void setContent(List<?> content) {
		this.content = content;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	
	
}
