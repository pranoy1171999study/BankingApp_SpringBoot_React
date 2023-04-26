package com.monocept.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.monocept.entity.Accounts;
import com.monocept.entity.Customer;
import com.monocept.entity.Tranjuctions;

@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer>{
	public List<Accounts> findAllByBank(int bank_id);
	public List<Accounts> findAllByCid(Customer c);
	//SELECT  * FROM Accounts a WHERE substr(CAST(a.acc_id as CHAR),CAST(1 as CHAR))=1;
	//SELECT  * FROM Accounts a WHERE CAST(a.acc_id as CHAR) like '%1%'
	@Query(value="SELECT  * FROM Accounts a WHERE CAST(a.acc_id as CHAR) like '%1%';", 
		     nativeQuery = true)
	public List<Accounts> find10AccountsBySearchTerm( int term);
//	@Query(
//		    value = "select * from Accounts",
//		    countQuery = "select count(*) from Accounts where Accounts.fk_c_id=(:cid)",nativeQuery = true
//		)
//		public Page<Accounts> getAccountsbyCid(Pageable pageable,int cid);
}
