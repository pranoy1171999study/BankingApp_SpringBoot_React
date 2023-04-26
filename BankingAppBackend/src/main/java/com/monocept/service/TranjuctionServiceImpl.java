package com.monocept.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.monocept.entity.Accounts;
import com.monocept.entity.Customer;
import com.monocept.entity.OwnPage;
import com.monocept.entity.Tranjuctions;
import com.monocept.repository.AccountRepository;
import com.monocept.repository.CustomerRepository;
import com.monocept.repository.TranjuctionRepository;

@Service
public class TranjuctionServiceImpl implements TranjuctionService{
	@Autowired
	TranjuctionRepository trRepo;
	@Autowired
	AccountRepository accRepo;
	@Autowired
	CustomerRepository cRepo;

	@Override
	public Tranjuctions save(Tranjuctions tranjuction) {
		// TODO Auto-generated method stub
		return trRepo.save(tranjuction);
	}

	@Override
	public void deleteById(int id) {
		trRepo.deleteById(id);
		
	}

	@Override
	public Optional<Tranjuctions> getById(int id) {
		// TODO Auto-generated method stub
		return trRepo.findById(id);
	}

	@Override
	public List<Tranjuctions> findAllByCid(int cid) {
		Customer costomer=cRepo.findById(cid).get();
		List<Accounts> accounts=accRepo.findAllByCid(costomer);
		List<Integer> accNos=new ArrayList<Integer>();
		for(Accounts acc:accounts) {
			accNos.add(acc.getAccNo());
		}
		return trRepo.findAllTranjuctionsByAccounts(accNos);
	}

	@Override
	public List<Tranjuctions> findAll() {
		// TODO Auto-generated method stub
		return trRepo.findAll();
	}
	@Override
	public String transferMoney(int sender, int reciever, int amount) {
		Optional<Accounts> senderO=accRepo.findById(sender);
		Optional<Accounts> recieverO=accRepo.findById(reciever);
		if(!senderO.isPresent()) {
			return "invalid Sender + "+sender;
		}
		if(!recieverO.isPresent()) {
			return "invalid Reciever "+reciever;
		}
		Accounts senderAccount=senderO.get();
		Accounts recieverAccount=recieverO.get();
		if(amount<0) {
			return "invalid Amount";
		}
		
		if(senderAccount.getBalance()<amount) {
			return "Insufficeien Balance";
		}
		if(!senderAccount.setBalance((int)senderAccount.getBalance()-amount)){
			return "Insufficeien Balance";
			
		}
		if(!recieverAccount.setBalance((int)recieverAccount.getBalance()+amount)) {
			senderAccount.setBalance((int)senderAccount.getBalance()+amount);
			return "Something Went Wrong!!";
		}
		accRepo.save(senderAccount);
		accRepo.save(recieverAccount);
		Tranjuctions tr=new Tranjuctions();
		tr.setSender(sender);
		tr.setReciever(reciever);
		tr.setAmount(amount);
		trRepo.save(tr);
		return "successful";
	}
	@Override
	public String selfDeposite(int id,int amount) {
		Optional<Accounts> oaccount=accRepo.findById(id);
		if(!oaccount.isPresent()||amount<=0) {
			return "failed";
		}
		Accounts account=oaccount.get();
		if(!account.setBalance((int)account.getBalance()+amount))
				return "failed";
		Tranjuctions tr=new Tranjuctions(-1, id, amount);
		accRepo.save(account);
		trRepo.save(tr);
		return "successful";
	}
	public String selfWithdrawl(int id,int amount) {
		Optional<Accounts> oaccount=accRepo.findById(id);
		if(!oaccount.isPresent()) {
			return "failed";
		}
		Accounts account=oaccount.get();
		if(account.getBalance()<amount) {
			return "insufficient funds";
		}
		if(!account.setBalance((int)account.getBalance()-amount))
				return "failed";
		Tranjuctions tr=new Tranjuctions(id, -1, amount);
		accRepo.save(account);
		trRepo.save(tr);
		return "successful";
	}

	@Override
	public OwnPage findAllByAccNoPage(int AccNo, int pageNo, int size) {
		Optional<Accounts> acc=accRepo.findById(AccNo);
		if(!acc.isPresent()) {
			OwnPage page=new OwnPage();
			page.setSuccess(false);
			return page;
			
		}
		List<Integer> accs=new ArrayList<Integer>();
		accs.add(AccNo);
		int totalEntries=trRepo.countAllRowsOfTrsOfAcc(AccNo);
		int totalpages=(int)Math.ceil(totalEntries/(float) size);
		int l=pageNo*size;
		int r=size;
		List<Tranjuctions> trs=trRepo.findAllTranjuctionsByAccountsPage(accs,l,r);
		
		OwnPage page=new OwnPage();
		page.setContent(trs);
		page.setCurrentPage(pageNo);
		page.setTotalEntries(totalEntries);
		page.setTotalPages(totalpages);
		page.setSuccess(true);
		return page;
	}

	
}
