from django.shortcuts import render
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button
import os
import json
from .app import Stream3D as app

@login_required()
def map(request):
    """
    Controller for the app home page.
    """
# }
    print("entering the getCountriesFile function")
    app_workspace = app.get_app_workspace()
    file_path = os.path.join(app_workspace.path, 'countries.geojson')
    print(file_path)
    data_dict={}
    with open(file_path) as json_data:
        data_dict=json.load(json_data)
    context={
        "countries":data_dict
    }

    return render(request, 'stream3d/map.html', context)

def getCountriesFile(request):
    print("entering the getCountriesFile function")
    app_workspace = app.get_app_workspace()
    file_path = os.path.join(app_workspace.path, 'countries.geojson')
    print(file_path)
    with open(file_path) as json_data:
      data_dict=json.load(json_data)
      # print(data_dict)
    context={}
    return render (request,'stream3d/map.html', context )

def instructions(request):
    context = {}
    return render (request,'stream3d/instructions.html', context )

def home(request):
    context = {}
    return render (request,'stream3d/home.html', context )
