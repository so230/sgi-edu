package sgi.edu.deom.memberService.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sgi.edu.deom.memberService.domain.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}