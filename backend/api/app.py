from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import heapq

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",  # Thay đổi theo địa chỉ frontend của bạn
    "http://127.0.0.1:3000",  # Thay đổi theo địa chỉ frontend của bạn
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức
    allow_headers=["*"],  # Cho phép tất cả các headers
)

class State(BaseModel):
    firstState: list
    goalState: list


@app.post("/solve")
async def solve_puzzle(state: State):
    first_state = ''.join(state.firstState)
    goal_state = ''.join(state.goalState)
    solution = solve_8_puzzle(first_state, goal_state)
    result = {i: step for i, step in enumerate(solution)}
    return result

def solve_8_puzzle(first_state, goal_state):
    openlist = []
    father = {first_state: None}
    g = {first_state: 0}
    h = heuricstic_manhattan_distance(first_state, goal_state)
    f = g[first_state] + h
    heapq.heappush(openlist, (f, first_state))
    while openlist:
        f, current_state = heapq.heappop(openlist)
        if current_state == goal_state:
            path = []
            while current_state:
                path.append(list(current_state))
                current_state = father[current_state]
            return path[::-1]
        for next_state in expand_case(current_state):
            g[next_state] = g[current_state] + 1
            h = heuricstic_manhattan_distance(next_state, goal_state)
            f = g[next_state] + h
            if next_state not in father:
                father[next_state] = current_state
                heapq.heappush(openlist, (f, next_state))

def expand_case(current):
    """
        current: Trạng thái hiện tại của 8-puzzle là string gôm 9 kí tự
            "123456780" tương ứng 8-puzzle có dạng
            1 2 3
            4 5 6
            7 8   
            Số 0 là vị trí ô trống
        Trả về: list các trạng thái tiếp theo từ trạng thái ban đầu có dạng
        [str1, str2, str3, ...]  
    """ 
    zero_index = current.find('0')
    if zero_index == -1:
        raise ValueError('Khong co vi tri trong')
    if zero_index == 0 or zero_index == 6:
        return [swap_char(current, zero_index, zero_index + 1), swap_char(current, zero_index, 3)]
    if zero_index == 2 or zero_index == 8:
        return [swap_char(current, zero_index, zero_index - 1), swap_char(current, zero_index, 5)]
    if zero_index == 4:
        return [swap_char(current, 4, i) for i in [1, 3, 5, 7]]
    if zero_index == 3 or zero_index == 5:
        return [swap_char(current, zero_index, i) for i in [zero_index - 3, zero_index + 3, 4]]
    if zero_index == 1 or zero_index == 7:
        return [swap_char(current, zero_index, i) for i in [zero_index - 1, zero_index + 1, 4]]
    
def swap_char(s, i, j):
    lst = list(s)
    lst[i], lst[j] = lst[j], lst[i]
    return ''.join(lst)

def heuricstic_manhattan_distance(current_state, goal_state):
    result = 0
    for i in "12345678":
        pos_in_current = (int(current_state.index(i)/3), current_state.index(i)%3)
        pos_in_goal = (int(goal_state.index(i)/3), goal_state.index(i)%3)
        result += manhattan_distance(pos_in_current, pos_in_goal)
    return result

def manhattan_distance(x, y):
    return abs(x[0] - y[0]) + abs(x[1] - y[1])

