from django.shortcuts import render, redirect
from app_new import tasks
from celery.result import AsyncResult
import json


# Create your views here.
def webserver(request):
    return render(request, 'app_new/webserver.html', {})


def submit_job(request):
    sequence = request.POST.get("sequence")
    # 剔除 >xxx
    if ">" in sequence:
        sequence = "".join(sequence.split("\n")[1:])
    to_email = request.POST.get("email")
    res = tasks.submit.delay(sequence, to_email)
    print("start running task")
    pid = res.id
    tasks.submit.update_state(task_id=pid, state="WAITING", meta={})    # 和过期任务id，不存在的任务id返回状态PENDING区别开
    # print(res.id)
    # print("async task res", res.get())
    return redirect(status, pid=pid)


def status(request, pid):
    # print("async task res", res.get())
    # 判断任务是否存在, 过期任务和不存在任务都会返回状态PENDDING和result=None 而不报错；
    # 为了区分开，提交submit任务的等待状态被我修改为WAITING
    task = AsyncResult(pid)
    status = task.status    # PENDING, START, SUCCESS，任务当前的状态
    print(status)
    if status == "PENDING":
        return render(request, "app_new/error.html", {})
    result = ""
    if status == "SUCCESS":
        result = task.result
    return render(request, "app_new/status.html", {"pid": pid, "status": status,"result": result, "resultDict": json.dumps(result)})
