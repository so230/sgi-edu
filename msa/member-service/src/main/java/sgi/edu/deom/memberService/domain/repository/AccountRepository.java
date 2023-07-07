package sgi.edu.deom.memberService.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sgi.edu.deom.memberService.domain.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    public List<Account> findByCompany(String company);
}