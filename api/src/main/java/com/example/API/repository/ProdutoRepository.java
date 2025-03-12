package com.example.API.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.API.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}