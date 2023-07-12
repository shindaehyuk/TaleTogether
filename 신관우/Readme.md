# JPA

참고 github

https://github.com/holyeye/jpabook

```sql
CREATE TABLE MEMBER (
	ID VARCHAR(255) NOT NULL,
	NAME VARCHAR(255),
	AGE INTEGER,
	PRIMARY KEY (ID)
)
```

```java
package jpabook.start;

import javax.persistence.*;

@Entity
@Table(name="MEMBER")
public class Member {
	@Id
	@Column(name = "ID")
	private String id;

	@Column(name = "NAME")
	private String username;

	private Integer age;
}
```

### @Entity

- 이 클래스를 테이블과 매핑한다고 JPA에 알려줌
- 엔티티 클래스

### @Table

- 엔티티 클래스에 매핑할 테이블 정보를 알려준다.
- name속성을 사용해 Member 엔티티를 MEMBER 테이블에 매핑했다.
- 이 어노테이션을 생략하면 클래스 이름(엔티티이름을)을 테이블 이름으로 매핑

### @Id

- 엔티티 클래스의 필드를 테이블의 기본 키에 매핑
- 식별자 필드

### @Column

- 필드를 컬럼에 매핑
  - name : 필드와 매핑할 테이블의 컬럼이름

### @JoinColumn

- 외래 키를 매핑할 때 사용
  - name : 매핑할 외래 키 이름
    - ‘필드명\_참조하는 테이블의 기본 키 컬럼명’ 으로 기본값 설정.

### 매핑 정보가 없는 필드

- age필드에는 매핑 어노테이션이 없다
- 이럴 경우 필드명을 사용해 컬럼명으로 매핑
- 대소문자를 구분하는 DB의 경우엔 @Column(name = “AGE”) 이런 식으로 매핑해야한다.

### persistence.xml

```sql
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://xmlns.jcp.org/xml/ns/persistence" version="2.1">

    <persistence-unit name="jpabook">

        <properties>

            <!-- 필수 속성 -->
						#JPA 표준 속성
						#jdbc 드라이버
            <property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
						#DB 접속 아이디
            <property name="javax.persistence.jdbc.user" value="sa"/>
						#DB 접속 비밀번호
            <property name="javax.persistence.jdbc.password" value=""/>
						#DB 접속 URL
            <property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>
            #하이버네이트 속성
						#DB 방언(Dialect) 설정
						<property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect" />

            <!-- 옵션 -->
            <property name="hibernate.show_sql" value="true" />
            <property name="hibernate.format_sql" value="true" />
            <property name="hibernate.use_sql_comments" value="true" />
            <property name="hibernate.id.new_generator_mappings" value="true" />

            <!--<property name="hibernate.hbm2ddl.auto" value="create" />-->
        </properties>
    </persistence-unit>

</persistence>
```

### DB 방언

- H2 : org.hibernate.dialect.H2Dialect
- 오라클 10g : org.hibernate.dialect.Oracle10gDialect
- MySQL : org.hibernate.dialect.MySQL5InnoDBDialect

```sql
public static void logic(EntityManager em) {

        String id = "id1";
        Member member = new Member();
        member.setId(id);
        member.setUsername("지한");
        member.setAge(2);

        //등록
        em.persist(member);

        //수정
        member.setAge(20);

        //한 건 조회
        Member findMember = em.find(Member.class, id);
        System.out.println("findMember=" + findMember.getUsername() + ", age=" + findMember.getAge());

        //목록 조회
        List<Member> members = em.createQuery("select m from Member m", Member.class).getResultList();
        System.out.println("members.size=" + members.size());

        //삭제
        em.remove(member);

    }
```

### CRUD

- craete : em.persist();
- read:
  - em.find() : 한건 조회
- update: member.setAge()
  - jpa의 경우 단순히 엔티티의 값만 변경하여도 추적하는 기능으로 인해 수정이 된다.
- delete: em.remove()

```java
package jpabook.start;

import javax.persistence.*;
import java.util.List;

/**
 * @author holyeye
 */
public class JpaMain {

    public static void main(String[] args) {

        //엔티티 매니저 팩토리 생성
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("jpabook");
        EntityManager em = emf.createEntityManager(); //엔티티 매니저 생성

        EntityTransaction tx = em.getTransaction(); //트랜잭션 기능 획득

        try {

            tx.begin(); //트랜잭션 시작
            logic(em);  //비즈니스 로직
            tx.commit();//트랜잭션 커밋

        } catch (Exception e) {
            e.printStackTrace();
            tx.rollback(); //트랜잭션 롤백
        } finally {
            em.close(); //엔티티 매니저 종료
        }

        emf.close(); //엔티티 매니저 팩토리 종료
    }

    public static void logic(EntityManager em) {

        String id = "id1";
        Member member = new Member();
        member.setId(id);
        member.setUsername("지한");
        member.setAge(2);

        //등록
        em.persist(member);

        //수정
        member.setAge(20);

        //한 건 조회
        Member findMember = em.find(Member.class, id);
        System.out.println("findMember=" + findMember.getUsername() + ", age=" + findMember.getAge());

        //목록 조회
        List<Member> members = em.createQuery("select m from Member m", Member.class).getResultList();
        System.out.println("members.size=" + members.size());

        //삭제
        em.remove(member);

    }
}
```

- 모든것을 하고 DB에 적용하고 싶으면 트랜잭션을 커밋해야한다.
- JPA에서 엔티티를 저장할 때 연관된 모든 엔티티는 영속 상태여야 한다.

### join 관련 사이트

[JPA 다양한 Join 방법 정리 (N+1, queryDSL, fetch join)](https://wedul.site/638)

### JOIN 검색

```java
private static void queryLogicJoin(EntityManager em){
	String jpql = "select m from Member m join m.team t where " + "t.name=:teamName";
	List<Member> resultList = em.createQuery(jpql, Member.class)
	.setParameter("teamName", "팀1");
	.getResultList();

	for (Member member : resultList){
		System.out.println("[query] member.username=" + member.getUsername());
	}
}

// 결과: [query] member.username=회원1
// 결과: [query] member.username=회원2
```

위 코드를 실행하면 아래와 같이 실행된다.

```sql
SELECT M.* FROM MEMBER MEMBER
INNER JOIN
	TEAM TEAM ON MEMBER.TEAM_ID = TEAM1_.ID
WHERE TEAM1_.NAME ='팀1'
```

### Criteria

- javax.persistence.criteria 패키지 안에 있다.

```java
//JPQL
//select m from Member m
//where m.username = '회원1'
//order by m.age desc

CriteriaBuilder cb = em.getCriteriaBuilder();

CriteriaQuery<Member> cq = cb.craeteQuery(Member.class);

Root<Member> m = cq.from(Member.class); // From절

//검색조건 정의
Predicate usernameEqual = cb.equal(m.get("username"), "회원1");

//정렬조건 정의
javax.persistence.criteria.Order ageDesc = cb.desc(m.get("age"));

//쿼리 생성
cq.select(m)
	.where(usernameEqual)//where 절 생성
	.orderBy(ageDesc); //order by 절 생성

List<Member> resultList = em.createQuery(cq).getResultList();
```

메타모델 gradle로 만드는거 찾아볼것

### appConfig.xml 예제

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

		<!--@Transactional이 붙은곳에 트랜잭션을 적용-->
    <tx:annotation-driven/>

    <context:component-scan base-package="jpabook.jpashop.service, jpabook.jpashop.repository"/>

		<!--데이터베이스에 접근할 데이터 소스 등록-->
    <bean id="dataSource" class="org.apache.tomcat.jdbc.pool.DataSource">
        <property name="driverClassName" value="org.h2.Driver"/>
        <property name="url" value="jdbc:h2:mem:jpashop"/>
        <property name="username" value="sa"/>
        <property name="password" value=""/>
    </bean>

		<!--트랜잭션 관리자 설정-->
		<!--jpa를 사용하기위해 jpatransactionmanager로 설정-->
    <bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- JPA 예외를 스프링 예외로 변환 -->
		<!-- @Repository가 붙어있는 스프링빈에 예외 변환 AOP를 적용-->
    <bean class="org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor"/>

		<!--엔티티 매니저 팩토리 등록-->
		<!--jpa를 사용하려면 LocalContainerEntityManagerFactoryBean를 등록해야함-->
		<!--이를 통해 persistence.xml이 없어도 동작은 가능하다-->
    <bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
        <property name="dataSource" ref="dataSource"/>
				<!-- @Entity가 붙은 클래스를 자동으로 검색하기 위한 탐색 시작 위치 -->
        <property name="packagesToScan" value="jpabook.jpashop.domain"/>
				<!--사용할 jpa벤더 지정, 하이버네이트를 구현체로 사용하므로 hibernatejpavendoradapter를 사용함-->
        <property name="jpaVendorAdapter">
            <!-- 하이버네이트 구현체 사용 -->
            <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter"/>
        </property>
				<!-- 하이버네이트 상세 설정 -->
        <property name="jpaProperties">
            <props>
								<!-- 방언 설정, H2 데이터베이스 방언 지정 -->
                <prop key="hibernate.dialect">org.hibernate.dialect.H2Dialect</prop>
								<!-- 실행한 SQL 콘솔에서 보기 -->
                <prop key="hibernate.show_sql">true</prop>
                <!-- SQL 보기좋게 정렬해서 보기 -->
								<prop key="hibernate.format_sql">true</prop>
								<!-- 사용자가 설정한 SQL 코멘트 보기 -->
                <prop key="hibernate.use_sql_comments">true</prop>
								<!-- jpa에 맞춰 새 버전의 ID 생성 옵션 -->
                <prop key="hibernate.id.new_generator_mappings">true</prop>
								<!-- DDL 자동 생성 -->
									<!--create : 기존 DDL을 제거하고 새로 생성-->
									<!--create-drop : create와 같고, 종료 시 생성한 DDL 삭제-->
									<!--update : 현재 DB DDL과 비교하여 변경사항만 수정-->
									<!--validate : 현재 엔티티 매핑정보와 DB 스키마가 같은지 비교하여-->
									<!--다르면 경고를 남기고 실행하지 않음, DDL을 변경하지 않음-->
                <prop key="hibernate.hbm2ddl.auto">create</prop>
            </props>
        </property>
    </bean>

</beans>
```

### 회원 repository 예제(리팩토링 전)

```java
package jpabook.jpashop.repository;

import jpabook.jpashop.domain.Member;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * User: HolyEyE
 * Date: 2013. 12. 3. Time: 오전 1:08
 */
@Repository
public class MemberRepository {

    @PersistenceContext
    EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }

    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }

    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
    }
}
```

- @PersistenceContext
  - 순수 자바에서는 엔티티 매니저를 직접 생성하여 사용했으나, 스프링이나 J2EE 컨테이너를 사용하면 컨테이너가 관리하고 제공해줌
  - 이에 컨테이너가 제공하는 엔티티 매니저를 사용해야 한다.

### 회원 레포지토리 예제(리팩토링 후)

```java
package jpabook.jpashop.repository;

import jpabook.jpashop.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * User: HolyEyE
 * Date: 2013. 12. 3. Time: 오전 1:08
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findByName(String name);
}
```

- save, fineOne, findAll 같은 기본적 메소드는 JpaRepository에서 모두 제공
