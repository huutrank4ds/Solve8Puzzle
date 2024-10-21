import heapq # Hàng đợi ưu tiên

def swap_char(str, index1, index2):
    """
        str: chuỗi ban đầu
        index1: số nguyên chỉ vị cần hoán đổi
        index2: số nguyên chỉ vị cần hoán đổi
        Trả về: chuỗi mới mà giá trị tại index1 sẽ hoán đổi với giá trị tại index2
    """
    str_list = list(str)
    str_list[index1], str_list[index2] = str_list[index2], str_list[index1]
    return ''.join(str_list)


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

def print_case(case):
    for i in range(9):
        if (i + 1) % 3 == 0:
            print(case[i])
        else:
            if case[i] == 0:
                print('_', end=' ')
            else:
                print(case[i], end=' ')

def string_to_matrix(str):
    # Chuyển chuỗi thành danh sách các số nguyên
    numbers = list(str)
    # Kiểm tra độ dài để chắc chắn chuỗi có đúng 9 ký tự
    if len(numbers) != 9:
        raise ValueError("Chuỗi phải chứa đúng 9 ký tự số.")
    # Chia danh sách thành các hàng để tạo ma trận 3x3
    matrix = [numbers[i:i+3] for i in range(0, len(numbers), 3)]
    return matrix

def find_element_in_matrix(matrix, target):
    # Duyệt qua từng hàng và sử dụng enumerate để lấy chỉ số hàng và cột
    for i, row in enumerate(matrix):
        if target in row:
            return (i, row.index(target))  # Trả về vị trí (hàng, cột)
    return None

def manhattan_distance(point1, point2):
    x1, y1 = point1
    x2, y2 = point2
    return abs(x1 - x2) + abs(y1 - y2)
    
def heuricstic_manhattan_distance(first_state, goal_state):
    result = 0
    for i in "12345678":
        first_state_point = find_element_in_matrix(first_state, i)
        goal_state_point = find_element_in_matrix(goal_state, i)
        result = result + manhattan_distance(first_state_point, goal_state_point)
    return result

def solve_8_puzzle(first_state, goal_state = "012345678", heu='Manhattan'):
    """
        first_state: Trạng thái ban đầu của 8-puzzle
        goal_state: Trạng thái mà chúng ta muốn đạt được
        heu: Hàm heuristic để sử dụng
        Trả về: Đường đi từ trạng thái ban đầu đến trạng thái mục tiêu hoặc None nếu không có
    """
    if heu == 'Manhattan':
        openlist = [] # Tạo một hàng đợi ưu tiên
        father = {first_state: None}
        g = {first_state: 0}
        h = heuricstic_manhattan_distance(first_state, goal_state)
        f = g[first_state] + h
        heapq.heappush(openlist, (f, first_state))
        while openlist:
            f, current_state = heapq.heappop(openlist)
            # print(f'{current_state}: g = {g[current_state]}: h = {heuricstic_manhattan_distance(current_state, goal_state)}')
            if current_state == goal_state:
                path = []
                while current_state:
                    path.append(current_state)
                    current_state = father[current_state]
                return path[::-1]
            for next_state in expand_case(current_state):
                g[next_state] = g[current_state] + 1
                h = heuricstic_manhattan_distance(next_state, goal_state)
                f = g[next_state] + h
                if next_state not in father:
                    father[next_state] = current_state
                    heapq.heappush(openlist, (f, next_state))
    elif heu == 'n_wrong_position':
        pass



first_state = "724506831"
goal_state = "012345678"
openlist = []
path = solve_8_puzzle(first_state, goal_state)
for case in path:
    print_case(case)
    print(heuricstic_manhattan_distance(case, goal_state))