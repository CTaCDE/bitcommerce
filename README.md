# 193Tees: Artist promotion platform and e-commerce website
Developed by UC Davis students for ECS 193: Senior Design Project. 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. For more detailed instructions, see 193TeesUserGuide.pdf

### Prerequisites

You will need the latest version of the [MEAN stack](http://mean.io/) and [Google CLI](https://cloud.google.com/sdk/)

### Installing

To install, you will need to clone the latest copy of the repo, install node dependences, and set up developer accounts with the external API's.
```
git clone https://github.com/CTaCDE/bitcommerce.git
npm install
```

You will need to make an account at [mLab](https://mlab.com/) and create a keys.json file with the following fields:
```
{
  "mongoHost": "<dsname>.mlab.com",
  "mongoPort": "<port>",
  "mongoDatabase": "<databaseName>",
  "mongoUser": "<mlabusername>",
  "mongoPass": "<mlabpassword>"
}
```
**Be 110% certain this file is in the .gitignore!! This file grants authorization to read and modify your database!!**

See the following links to setup developer accounts:
[Google App Engine](https://cloud.google.com/appengine/)
[Facebook](https://developers.facebook.com/)
[Paypal](https://developer.paypal.com/)

## Deployment

To deploy, pull the latest changes from master and deploy to app engine. The ```--stop-previous-version``` flag ensures that only the latest instance will run to reduce compute hours charged.
```
git pull origin master
gcloud app deploy --stop-previous-version
```

## Built With

* [Google Cloud Platform](http://cloud.google.com/) - Hosting the NodeJS runtime environment
* [mLab](https://mlab.com/home) - Database management and hosting
* [Amazon Web Services](https://aws.amazon.com/) - Hosting the uptime prober
* [MEAN Stack](http://mean.io/) - Used to develop server/model/views

## Versioning

We use [Github Tags](http://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/CTaCDE/bitcommerce/tags). 

## Authors

* **Christopher Ta** - [Github](https://github.com/CTaCDE)
* **Phuong Nguyen** - [Github](https://github.com/phuonghn)
* **Rose-Marie Eter** - [Github](https://github.com/r-eter)
* **Jade MacDonnell** - [Github](https://github.com/jmac7789)


## Acknowledgments

* Travis Heppe (Client & Software Engineer @ Google)
* Xin Liu (Professor for ECS 193A/B)
* Albara Ramli (TA for ECS 193A/B)
