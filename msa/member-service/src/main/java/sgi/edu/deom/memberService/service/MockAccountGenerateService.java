package sgi.edu.deom.memberService.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sgi.edu.deom.memberService.domain.entity.Account;
import sgi.edu.deom.memberService.domain.repository.AccountRepository;

@Service
public class MockAccountGenerateService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountIdGenerationService accountIdGenerationService;

    public void generateAccounts() {
        Account account1=  Account.builder()
                .id(accountIdGenerationService.newAccountId())
                .balance(new BigDecimal(100))
                .name("이호진")
                .company("EY")
                .build();
        accountRepository.save(account1);

        Account account2=  Account.builder()
                .id(accountIdGenerationService.newAccountId())
                .balance(new BigDecimal(100))
                .name("송지은")
                .company("EY")
                .build();
        accountRepository.save(account2);

        Account account3=  Account.builder()
                .id(accountIdGenerationService.newAccountId())
                .balance(new BigDecimal(100))
                .name("이성준")
                .company("SGI 서울보증보험")
                .build();
        accountRepository.save(account3);

        Account account4=  Account.builder()
                .id(accountIdGenerationService.newAccountId())
                .balance(new BigDecimal(100))
                .name("이진희")
                .company("SGI 서울보증보험")
                .build();
        accountRepository.save(account4);

        Account account5=  Account.builder()
                .id(accountIdGenerationService.newAccountId())
                .balance(new BigDecimal(100))
                .name("박소원")
                .company("SGI 서울보증보험")
                .build();
        accountRepository.save(account5);
    }
}