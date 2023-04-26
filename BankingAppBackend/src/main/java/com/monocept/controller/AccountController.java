package com.monocept.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monocept.entity.Accounts;
import com.monocept.entity.Customer;
import com.monocept.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	AccountService accService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveAccount(@RequestBody Accounts acc) {
		 accService.save(acc);
		 return ResponseEntity.status(HttpStatus.OK).body(acc);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteAccount(@PathVariable int id) {
		 accService.deleteById(id);
		 return ResponseEntity.status(HttpStatus.OK).body(id);
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getAccount(@PathVariable int id) {
		Optional<Accounts> e=accService.getById(id);
		 return ResponseEntity.status(HttpStatus.OK).body(e);
	}
	@GetMapping("")
	public ResponseEntity<?> getAccounts() {
		List<Accounts> accounts=accService.findAll();
		 return ResponseEntity.status(HttpStatus.OK).body(accounts);
	}
	@GetMapping("/customer/{id}")
	public ResponseEntity<?> getAccountsbyCid(@PathVariable int id) {
		List<Accounts> e=accService.getCustomerWithAccounts(id);
		 return ResponseEntity.status(HttpStatus.OK).body(e);
	}
	@GetMapping("/search/{term}")
	public ResponseEntity<?> getCustomerBySearchTerm(@PathVariable int term) {
		List<Accounts> e=accService.find10AccountsBySearchTerm(term);
		 return ResponseEntity.status(HttpStatus.OK).body(e);
	}
	@PostMapping("/set/{bal}/bank/{bankId}/cid/{cId}")
	public ResponseEntity<?> addAccountWithBankAndCustomer(@PathVariable int bal,
								  @PathVariable int bankId,@PathVariable int cId) {
		String res=accService.add(bal,bankId,cId);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	@PutMapping("/update/{accid}/{bal}/bank/{bankId}/cid/{cId}")
	public ResponseEntity<?> updateAccountWithBankAndCustomer(@PathVariable int accid,@PathVariable int bal,
								  @PathVariable int bankId,@PathVariable int cId) {
		String res=accService.update(accid,bal,bankId,cId);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	@GetMapping("/page") //for get method(get some data from server) @PostMapping for post method, @putM.. @Del.. 
	public ResponseEntity<?> findByPageAndLimit(@RequestParam int pageno,@RequestParam int size) {
		org.springframework.data.domain.Pageable pageable =  PageRequest.of(pageno, size);
		Page<Accounts> result=accService.findAll(pageable);
		return ResponseEntity.status(HttpStatus.OK).body(result);
//		http://localhost:8080/emailapp/emails/page?pageno=0&size=5
	}
	
}
