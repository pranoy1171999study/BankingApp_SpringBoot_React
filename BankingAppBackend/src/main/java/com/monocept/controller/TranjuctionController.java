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

import com.monocept.entity.Email;
import com.monocept.entity.OwnPage;
import com.monocept.entity.Tranjuctions;
import com.monocept.service.TranjuctionService;

@RestController
@RequestMapping("/tranjuction")
public class TranjuctionController {
	@Autowired
	TranjuctionService trService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveTranjuction(@RequestBody Tranjuctions tr) {
		trService.save(tr);
		 return ResponseEntity.status(HttpStatus.OK).body(tr);
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteTranjuction(@PathVariable int id) {
		trService.deleteById(id);
		 return ResponseEntity.status(HttpStatus.OK).body(id);
	}
	@GetMapping("customer/{id}")
	public ResponseEntity<?> getTranjuctionByCustomerId(@PathVariable int id) {
		List<Tranjuctions> e=trService.findAllByCid(id);
		 return ResponseEntity.status(HttpStatus.OK).body(e);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getTranjuction(@PathVariable int id) {
		Optional<Tranjuctions> e=trService.getById(id);
		 return ResponseEntity.status(HttpStatus.OK).body(e);
	}
	@GetMapping("/acc/{id}/page") 
	public ResponseEntity<?> findAllTrsByAccPage(@PathVariable int id,@RequestParam int pageno,@RequestParam int size) {
		OwnPage page=trService.findAllByAccNoPage(id, pageno, size);
		return ResponseEntity.status(HttpStatus.OK).body(page);
	}
	@GetMapping("")
	public ResponseEntity<?> getTranjuctions() {
		List<Tranjuctions> accounts=trService.findAll();
		 return ResponseEntity.status(HttpStatus.OK).body(accounts);
	}
	@PutMapping("/transfer")
	public ResponseEntity<?> transferMoney(@RequestParam int sender,
								  @RequestParam int reciever,
								  @RequestParam int amount) {
		String res= trService.transferMoney(sender, reciever, amount);
		return ResponseEntity.status(HttpStatus.OK).body(res);
	}
	@PutMapping("/deposite")
	public String selfDeposite(@RequestParam int acc,
								  @RequestParam int amount) {
		return trService.selfDeposite(acc, amount);
	}
	@PutMapping("/withdrawl")
	public String selfWithdrawl(@RequestParam int acc,
								  @RequestParam int amount) {
		return trService.selfWithdrawl(acc, amount);
	}
	
}
