package com.kw.service;

import java.util.*;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.kw.dto.ProblemDTO;
import com.kw.entity.Category;
import com.kw.entity.Problem;
import com.kw.entity.Solved;
import com.kw.entity.SubCategory;
import com.kw.repository.CategoryRepository;
//import com.kw.entity.Problem;
import com.kw.repository.ProblemRepository;
import com.kw.repository.SolvedRepository;
import com.kw.repository.SubCategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProblemServiceImpl implements ProblemService {

	@Autowired
	private ProblemRepository proRep;

	@Autowired
	private SubCategoryRepository subRep;

	@Autowired
	private CategoryRepository cateRep;

	@Autowired
	private SolvedRepository solvedRep;

	/**
	 * 문제 조회
	 */
	@Override
	public List<ProblemDTO> select_pro_All(String userId, Pageable pageable) {

		Page<Problem> pro_lst = proRep.findPageAll(pageable);
		int check = 0;
		List<ProblemDTO> lst = new ArrayList<ProblemDTO>();

		for (Problem p : pro_lst) {
			int problem_type = 0;
			// OX 문제일 경우
			if (p.getAnswer3() == null) {
				problem_type = 1;
			}
			Solved sol = solvedRep.findProAndUser(userId, p.getProblemId());
			if (sol != null) {
				if (sol.getSuccess() == 1) {
					check = 1;
				} else if (sol.getSuccess() == 2) {
					check = 2;
				}
			}
			ProblemDTO dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
					p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), p.getSolution(), problem_type,
					p.getSubcategory(), check);
			lst.add(dto);
		}
		return lst;
	}

	/**
	 * 카테고리 체크
	 */
	@Override
	public List<ProblemDTO> select_pro_category_user(String userId, Long category_id, Pageable pageable) {
		List<ProblemDTO> lst = new ArrayList<ProblemDTO>();
		int check = 0;
		// 카테고리에 해당되는 서브 카테고리 소환
//		Category cate = cateRep.findById(category_id).orElse(null);
//		List<SubCategory> sub = subRep.findListByCategory(cate);
		// 반복문을 돌려서 서브 카테고리들에 해당 되는 문제들을 소환해서 리스트에 넣는다.
//		for(SubCategory s : sub ) {
		Page<Problem> pro_lst = proRep.findListByProByCate(category_id, pageable);
//			Page<Problem> pro_lst = proRep.findListBySubcategory(s.getSubcategoryId(),pageable);
		for (Problem p : pro_lst) {
			int problem_type = 0;
			// OX 문제일 경우
			if (p.getAnswer3() == null) {
				problem_type = 1;
			}
			Solved sol = solvedRep.findProAndUser(userId, p.getProblemId());
			if (sol != null) {
				if (sol.getSuccess() == 1) {
					check = 1;
				} else if (sol.getSuccess() == 2) {
					check = 2;
				}
			}
			ProblemDTO dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
					p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), p.getSolution(), problem_type,
					p.getSubcategory(), check);
			lst.add(dto);
		}
//		}

		return lst;
	}

	/**
	 * 카테고리 체크
	 */
	@Override
	public List<ProblemDTO> select_pro_category(Long category_id) {
		List<ProblemDTO> lst = new ArrayList<ProblemDTO>();
		// 카테고리에 해당되는 서브 카테고리 소환
		Category cate = cateRep.findById(category_id).orElse(null);
		List<SubCategory> sub = subRep.findListByCategory(cate);
		// 반복문을 돌려서 서브 카테고리들에 해당 되는 문제들을 소환해서 리스트에 넣는다.
		for (SubCategory s : sub) {
			List<Problem> pro_lst = proRep.findListBySubcategory(s);
			for (Problem p : pro_lst) {
				int problem_type = 0;
				// OX 문제일 경우
				if (p.getAnswer3() == null) {
					problem_type = 1;
				}
				ProblemDTO dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(),
						p.getAnswer1(), p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), p.getSolution(), problem_type,
						s);
				lst.add(dto);
			}
		}

		return lst;
	}

	/**
	 * 문제 해설 가져오기
	 */
	public ProblemDTO select_pro(String problemId) {
		ProblemDTO dto = new ProblemDTO();
		Problem p = proRep.findListByProblemId(Long.parseLong(problemId));

		int problem_type = 0;
		// OX 문제일 경우
		if (p.getAnswer3() == null) {
			problem_type = 1;
		}
		dto = new ProblemDTO(p.getProblemId(), p.getTitle(), p.getQuestion(), p.getAnswerIndex(), p.getAnswer1(),
				p.getAnswer2(), p.getAnswer3(), p.getAnswer4(), p.getSolution(), problem_type, p.getSubcategory());

		return dto;
	}

	@Override
	public List<ProblemDTO> select_random_problem(Long category, Integer problem_cnt) {
		List<ProblemDTO> list = select_pro_category(category);
		Integer size = list.size();
		if (size < problem_cnt) {
			problem_cnt = list.size();
			System.out.println("랜덤 문제 추출 중 원래 문제 수 부족");
		}
		Set<Integer> ProblemIndexSet = new HashSet<>();
		while (ProblemIndexSet.size() < problem_cnt) {
			ProblemIndexSet.add(new Random().nextInt(size));
		}
		List<ProblemDTO> ret = new ArrayList<>();
		for (Integer idx : ProblemIndexSet) {
			ret.add(list.get(idx));
		}
		return ret;
	}

	@Override
	public Integer count_Pro() {
		return proRep.countPro();
	}

	@Override
	public Integer count_Pro_cate(Long category_id) {

		return proRep.countPro_cat(category_id);
	}

	/**
	 * 랜덤으로 문제 번호를 조회
	 * */
	@Override
	public Long getProblemId(Long subcategoryId){
		List<Problem> list = proRep.findBySubcategoryId(subcategoryId);
		Random random = new Random();
		//리스트 크기만큼의 랜덤 인덱스
		int randomIdx = random.nextInt(list.size());
		//랜덤 인덱스에 해당하는 문제 번호 리턴
		Long problemId = list.get(randomIdx).getProblemId();
		if(problemId != null){
			return  null;
		}
		return problemId;
	}

}
