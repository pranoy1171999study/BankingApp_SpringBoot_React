package com.monocept.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.monocept.entity.Tranjuctions;

@Repository
public interface TranjuctionRepository extends JpaRepository<Tranjuctions, Integer>{
	@Query(value="SELECT  * FROM Tranjuctions t WHERE t.reciever IN (:accounts) or Sender IN (:accounts)", 
		     nativeQuery = true)
	public List<Tranjuctions> findAllTranjuctionsByAccounts( @Param("accounts") List<Integer> accounts);
	
	@Query(value="SELECT  * FROM Tranjuctions t WHERE t.reciever IN (:accounts) or Sender IN (:accounts)  order by t.time desc LIMIT :r OFFSET :l", 
		     nativeQuery = true)
	public List<Tranjuctions> findAllTranjuctionsByAccountsPage( @Param("accounts") List<Integer> accounts,@Param("l")int l,@Param("r") int r);

	@Query(value="SELECT  COUNT(*) FROM Tranjuctions t WHERE t.reciever IN (:account) or Sender IN (:account)", 
		     nativeQuery = true)
	public int countAllRowsOfTrsOfAcc( @Param("account") int account);

}
