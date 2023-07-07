package sgi.edu.deom.memberService.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sgi.edu.deom.memberService.domain.entity.Account;
import sgi.edu.deom.memberService.domain.repository.AccountRepository;

@Service
public class AccountQueryService {

    @Autowired
    private AccountRepository accountRepository;

    public Optional<Account> getAccountById(Long accountId) {
        return  accountRepository.findById(accountId);
    }

    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Account updateCompany(Long accountId, String company) {
        Account account = accountRepository.findById(accountId).get();
        account.setCompany(company);
        return accountRepository.save(account);        
    }

    public List<Account> updateComapnyAll(String orgName, String company){
        List<Account> accountList = accountRepository.findByCompany(orgName);
        for(Account account : accountList ){
            account.setCompany(company);
        }
        return accountRepository.saveAll(accountList);
    }
}