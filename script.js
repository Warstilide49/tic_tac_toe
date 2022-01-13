const board=(()=>{
	let board_array=[];
	const check_array=["012","345","678","036","147","258","048","246"]
	const reset_array=()=>{
		board_array=[];
		for(let i=0;i<9;i++){
			board_array.push("");
		}
	}
	const change=(position,symbol)=>{
		board_array[position]=symbol;
	}
	const getValue=(position)=>{
		return board_array[position];
	}
	const check=()=>{
		for(let i=0;i<8;i++){
			let flag=1;
			a=check_array[i].split("")
			let value=board_array[a[0]];
			
			if (value==="")
				continue
			for(let j=1;j<3;j++){
				if (board_array[a[j]]!=value){
					flag=0;
				}
			}
			if(flag==1)
				return a
		}
		return 0;
	}

	const isFull=()=>{
		for(i=0;i<9;i++){
			if (board_array[i]=="")
				return 0
		}
		return 1
	}

	return{isFull,reset_array,getValue,change,check};
})();

const player=(symbol,name)=>{
	let turn=false;
	return{turn,name,symbol};
};

const game=(()=>{
	const p1=player('X',"Player 1");
	const p2=player('O',"Player 2");
	const change_turns=()=>{
		if(p1.turn){
			p1.turn=false;
			p2.turn=true;
		}
		else{
			p1.turn=true;
			p2.turn=false;
		}
	};
	return{p1,p2,change_turns};
})();

const block_handler=(()=>{
	const container=document.getElementById('container');
	const result=document.getElementById('result');
	let row_array=[];
	let element_array=[];

	const create_box=()=>{
		board.reset_array();
		for(let i=0;i<3;i++){
			const row=document.createElement('div');
			row.classList.add('row');
			container.appendChild(row);
			row_array.push(row);
			for(let j=0;j<3;j++){
				const element=document.createElement('div');
				element.classList.add('child');
				element_array.push(element);
				row.appendChild(element);
			}
		}
		element_array.forEach((element)=>{
			element.addEventListener('click',main_function);
		});
	}

	const delete_box=()=>{
		element_array.forEach((element)=>
			element.remove()
		);
		row_array.forEach((row)=>
			row.remove()
		);
		element_array=[];
		row_array=[];
	}

	const main_function=(e)=>{
		if(board.getValue(element_array.indexOf(e.target))!="")
			return
		if(board.check()!=0)
			return
		console.log(board.isFull());
		
		game.change_turns();
		let symbol=game.p1.turn ? game.p1.symbol : game.p2.symbol;
		e.target.textContent=symbol;
		board.change(element_array.indexOf(e.target),symbol);

		
		let a=board.check();
		if (a!=0){
			for(let i=0;i<3;i++)
				element_array[a[i]].classList.add('highlight');
			let player=game.p1.turn ? game.p1.name : game.p2.name;
			result.textContent=player+" has won! Congrats :)"

			return
		}
		if (board.isFull()==1){
			result.textContent="It is a draw";
			return
		}
	}


	
	return{create_box,delete_box};
})();

const initialize=(()=>{
	const result=document.getElementById('result');
	const reset_button=document.createElement('button');

	reset_button.textContent="Reset";
	const preprocessor=document.getElementById('preprocessor');
	let start_button=document.createElement('button');
	preprocessor.appendChild(start_button);
	start_button.textContent="Start";
	start_button.addEventListener('click',()=>{
		block_handler.create_box();
		start_button.remove();
		preprocessor.appendChild(reset_button);
	});

	reset_button.addEventListener('click',()=>{
		block_handler.delete_box();
		block_handler.create_box();
		result.textContent="";
	});

})();