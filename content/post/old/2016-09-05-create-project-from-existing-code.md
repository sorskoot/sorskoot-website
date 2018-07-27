---
id: 1580
title: Create project from existing code | Cordova, PhoneGap, Ionic, Visual Studio
date: 2016-09-05T14:26:28+00:00
author: Timmy
layout: post
guid: http://www.timmykokke.com/?p=1580
permalink: /2016/09/create-project-from-existing-code/
wsw-settings:
  - 'a:48:{s:13:"keyword_value";s:39:"Cordova, PhoneGap, Ionic, Visual Studio";s:15:"is_meta_keyword";s:1:"1";s:17:"meta_keyword_type";s:4:"tags";s:13:"is_meta_title";s:1:"1";s:10:"meta_title";s:0:"";s:19:"is_meta_description";s:1:"1";s:21:"is_meta_robot_noindex";s:0:"";s:22:"is_meta_robot_nofollow";s:0:"";s:19:"is_meta_robot_noodp";s:0:"";s:20:"is_meta_robot_noydir";s:0:"";s:16:"meta_description";s:0:"";s:17:"is_over_sentences";s:0:"";s:20:"first_over_sentences";s:0:"";s:19:"last_over_sentences";s:0:"";s:16:"is_rich_snippets";s:0:"";s:18:"show_rich_snippets";s:0:"";s:12:"rating_value";s:1:"0";s:13:"review_author";s:0:"";s:14:"review_summary";s:0:"";s:18:"review_description";s:0:"";s:10:"event_name";s:0:"";s:10:"event_date";s:0:"";s:9:"event_url";s:0:"";s:19:"event_location_name";s:0:"";s:21:"event_location_street";s:0:"";s:23:"event_location_locality";s:0:"";s:21:"event_location_region";s:0:"";s:12:"people_fname";s:0:"";s:12:"people_lname";s:0:"";s:15:"people_locality";s:0:"";s:13:"people_region";s:0:"";s:12:"people_title";s:0:"";s:14:"people_homeurl";s:0:"";s:15:"people_photourl";s:0:"";s:12:"product_name";s:0:"";s:16:"product_imageurl";s:0:"";s:19:"product_description";s:0:"";s:14:"product_offers";s:0:"";s:18:"is_social_facebook";s:0:"";s:25:"social_facebook_publisher";s:0:"";s:22:"social_facebook_author";s:0:"";s:21:"social_facebook_title";s:0:"";s:27:"social_facebook_description";s:0:"";s:17:"is_social_twitter";s:0:"";s:20:"social_twitter_title";s:0:"";s:26:"social_twitter_description";s:0:"";s:15:"autolink_anchor";s:0:"";s:19:"is_disable_autolink";s:0:"";}'
categories:
  - Visual Studio
tags:
  - Cordova
  - Ionic
  - PhoneGap
  - Visual Studio
---
When I start a new **Cordova** or **Ionic** project I normally start from the command line. I initialize the project and add some platforms and packages I need to use in my project. I sometimes start coding from **VSCode**, but there will be a point where I&#8217;d like to switch to **Visual Studio**, the full version. Until recently I started by creating a new project and move the existing code and config files into that. That was until I came across this awesome feature in Visual Studio: &#8220;Create New Project From Existing Code Files&#8221;. I don&#8217;t know when it was added, but I somehow missed it.

<!--more-->

Here&#8217;s how it works.

## Import existing project

I assume you already have an existing piece of code you want to move over to a Visual Studio project. To get it into Visual Studio the easy way, go to File &#8211;> New in the menu and select, _&#8220;Project From Existing Code&#8230;&#8221;_

[<img class="alignnone size-full wp-image-1583" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FileNew.png?resize=320%2C210" alt="FileNew" width="320" height="210" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FileNew.png?w=677&ssl=1 677w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FileNew.png?resize=300%2C197&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FileNew.png)

In the dialog that appears make sure _&#8220;Apache Cordova&#8221;_ is selected in the dropdown list and hit the &#8220;Next >&#8221; button.

[<img class="alignnone size-full wp-image-1582" src="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/CreateProject.png?resize=320%2C287" alt="CreateProject" width="320" height="287" srcset="https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/CreateProject.png?w=655&ssl=1 655w, https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/CreateProject.png?resize=300%2C269&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i1.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/CreateProject.png)

On the next dialog screen you have to navigate to the folder in which you Cordova project is. You also have to give your project a name. Hit &#8220;Finish&#8221; after that to close the dialog and start the creation of the project. This may take a few seconds.

[<img class="alignnone size-full wp-image-1584" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FolderNameProject.png?resize=320%2C287" alt="FolderNameProject" width="320" height="287" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FolderNameProject.png?w=655&ssl=1 655w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FolderNameProject.png?resize=300%2C269&ssl=1 300w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/FolderNameProject.png)

After the project is imported you&#8217;ll end up with a solution similar to the one in the image below.

[<img class="alignnone size-full wp-image-1585" src="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/solution.png?resize=320%2C544" alt="solution" width="320" height="544" srcset="https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/solution.png?w=372&ssl=1 372w, https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/solution.png?resize=177%2C300&ssl=1 177w" sizes="(min-width: 900px) 600px, 900px" data-recalc-dims="1" />](https://i0.wp.com/www.timmykokke.com/wp-content/uploads/2016/09/solution.png)

From this point on you can use Visual Studio to work on your Cordova, or Ionic, project.

&nbsp;