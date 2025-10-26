import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Users, 
  Clock, 
  Shield, 
  Wrench,
  Droplets,
  Home,
  FileText,
  CreditCard,
  Upload,
  Calendar,
  Star,
  ArrowRight,
  Award,
  Zap,
  HardHat,
  Leaf,
  AlertTriangle,
  Settings,
  ClipboardCheck,
  Menu,
  X
} from 'lucide-react'
import mepInspectionImg from './assets/mep-inspection.jpg'
import waterMeterImg from './assets/water-meter.jpg'
import villageWaterImg from './assets/village-water.jpg'
import saltwaterToiletImg from './assets/saltwater-toilet.jpg'
import waterSafetyImg from './assets/water-safety.png'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedService, setSelectedService] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    date: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  
  // 聯絡表單狀態
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSubmitMessage, setContactSubmitMessage] = useState('')
  const [contactSubmitError, setContactSubmitError] = useState('')

  const services = [
    {
      id: 'inspection',
      title: '專業驗樓',
      price: '港幣 3,000 起',
      description: '全面的樓宇結構及機電系統檢查，確保安全合規',
      features: ['結構安全檢查', '機電系統評估', '詳細報告', '專業建議'],
      icon: <HardHat className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '機電工程'
    },
    {
      id: 'water-meter',
      title: '申請水錶',
      price: '港幣 2,500 起',
      description: '協助申請新水錶安裝，處理所有政府手續',
      features: ['政府申請手續', '現場勘察', '安裝服務', '測試驗收'],
      icon: <Droplets className="w-8 h-8" />,
      image: waterMeterImg,
      category: '機電工程'
    },
    {
      id: 'village-water',
      title: '村屋供水',
      price: '港幣 8,000 起',
      description: '村屋供水系統設計、安裝及維護服務',
      features: ['系統設計', '管道安裝', '水泵配置', '定期維護'],
      icon: <Home className="w-8 h-8" />,
      image: villageWaterImg,
      category: '機電工程'
    },
    {
      id: 'split-meter',
      title: '分拆水錶',
      price: '港幣 5,000 起',
      description: '為多戶住宅提供獨立水錶分拆服務',
      features: ['現場評估', '管道改造', '錶位安裝', '系統測試'],
      icon: <Settings className="w-8 h-8" />,
      image: waterMeterImg,
      category: '機電工程'
    },
    {
      id: 'saltwater-toilet',
      title: '改用咸水沖廁',
      price: '港幣 6,000 起',
      description: '協助改裝咸水沖廁系統，節約淡水資源',
      features: ['系統改造', '管道重新配置', '設備更換', '政府申請'],
      icon: <Droplets className="w-8 h-8" />,
      image: saltwaterToiletImg,
      category: '機電工程'
    },
    {
      id: 'wr1',
      title: '簽發WR1',
      price: '港幣 1,500 起',
      description: '專業工程師簽發WR1證書及相關文件',
      features: ['現場檢查', '技術評估', '證書簽發', '政府提交'],
      icon: <FileText className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '機電工程'
    },
    {
      id: 'water-safety',
      title: '樓宇水安全申請',
      price: '港幣 4,000 起',
      description: '協助申請樓宇水安全計劃及相關認證',
      features: ['安全評估', '計劃制定', '文件準備', '政府申請'],
      icon: <Shield className="w-8 h-8" />,
      image: waterSafetyImg,
      category: '機電工程'
    },
    {
      id: 'safety-officer',
      title: '兼職安全主任 / 環保主任',
      price: '按次 / 按月收費',
      description: '提供專業的兼職安全主任及環保主任服務',
      features: ['安全監督', '環保監察', '法規查核', '報告編制'],
      icon: <HardHat className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '安全服務'
    },
    {
      id: 'fiou-audit',
      title: 'FIOU安全審核 / 查核',
      price: '按項目報價',
      description: '提供FIOU安全審核(Safety Audit)及安全查核(Safety Review)服務',
      features: ['安全審核', '風險評估', '合規檢查', '改善建議'],
      icon: <ClipboardCheck className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '安全服務'
    },
    {
      id: 'scaffold-form',
      title: '流動鋁架表格簽發',
      price: '港幣 800 起',
      description: '合資格人士簽發流動鋁架表格(五)',
      features: ['現場檢查', '安全評估', '表格簽發', '合規認證'],
      icon: <Settings className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '安全服務'
    },
    {
      id: 'confined-space',
      title: '密閉空間服務',
      price: '按日計算',
      description: '提供密閉空間合資格人士及器具租借服務',
      features: ['合資格人士', '試氣錶租借', '安全器具', '現場監督'],
      icon: <AlertTriangle className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '安全服務'
    },
    {
      id: 'environmental-permits',
      title: '環保牌照申請',
      price: '按項目報價',
      description: '協助地盤向環保處申請各類牌照及相關認證',
      features: ['污水牌申請', '噪音工作許可證(CNP)', '化學廢料登記', '空氣監測'],
      icon: <Leaf className="w-8 h-8" />,
      image: waterSafetyImg,
      category: '環保服務'
    },
    {
      id: 'safety-documents',
      title: '安全環保文件制定',
      price: '按文件類型收費',
      description: '制定法例所要求之安全文件/環保文件',
      features: ['風險評估', '安全巡查報告', '意外調查報告', '表格3A/2A'],
      icon: <FileText className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '環保服務'
    },
    {
      id: 'safety-meetings',
      title: '安全環保會議及諮詢',
      price: '按次收費',
      description: '出席業主/則師/顧問會議及提供專業諮詢',
      features: ['會議出席', '進度匯報', '安全巡查', '專業諮詢'],
      icon: <Users className="w-8 h-8" />,
      image: mepInspectionImg,
      category: '環保服務'
    }
  ]

  const stats = [
    { number: '800+', label: '完成項目', icon: <Users className="w-6 h-6" /> },
    { number: '99%', label: '客戶滿意度', icon: <Star className="w-6 h-6" /> },
    { number: '24h', label: '快速響應', icon: <Zap className="w-6 h-6" /> },
    { number: '15+', label: '服務年資', icon: <Shield className="w-6 h-6" /> }
  ]

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError('')
    
    try {
      const response = await fetch('https://kkh7ikc789gx.manus.space/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingForm)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitMessage(data.message || '預約申請已成功提交！我們將盡快聯絡您確認詳情。')
        setBookingForm({
          name: '',
          phone: '',
          email: '',
          address: '',
          service: '',
          date: '',
          message: ''
        })
      } else {
        setSubmitError(data.error || '提交失敗，請稍後再試或直接致電聯絡我們。')
      }
    } catch (error) {
      console.error('提交錯誤:', error)
      setSubmitError('網絡錯誤，請檢查網絡連接或直接致電聯絡我們。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 聯絡表單處理函數
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsContactSubmitting(true)
    setContactSubmitMessage('')
    setContactSubmitError('')
    
    try {
      const submitData = {
        ...contactForm,
        timestamp: new Date().toLocaleString('zh-HK', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
      
      const response = await fetch('https://kkh7ikc789gx.manus.space/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setContactSubmitMessage(data.message || '您的訊息已成功發送，我們將盡快回覆您。')
        setContactForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        setContactSubmitError(data.error || '發送失敗，請稍後再試或直接致電聯絡我們。')
      }
    } catch (error) {
      console.error('聯絡表單提交錯誤:', error)
      setContactSubmitError('網絡錯誤，請檢查網絡連接或直接致電聯絡我們。')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const handleContactInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  專業機電服務
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {[
                { key: 'home', label: '首頁' },
                { key: 'services', label: '服務項目' },
                { key: 'booking', label: '預約服務' },
                { key: 'contact', label: '聯絡我們' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleSectionChange(key)}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === key 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[
                  { key: 'home', label: '首頁' },
                  { key: 'services', label: '服務項目' },
                  { key: 'booking', label: '預約服務' },
                  { key: 'contact', label: '聯絡我們' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === key 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      {activeSection === 'home' && (
        <div>
          {/* Hero Section - Mobile Optimized */}
          <section className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    專業機電
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      服務
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
                    一站式機電工程解決方案<br />
                    專業可靠，服務至上
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      onClick={() => handleSectionChange('services')}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      查看服務項目
                    </Button>
                    <Button 
                      onClick={() => handleSectionChange('booking')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300"
                    >
                      立即預約
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <img 
                      src={mepInspectionImg} 
                      alt="專業機電服務" 
                      className="rounded-2xl shadow-2xl w-full h-auto"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="text-gray-800 font-semibold">專業認證</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">政府認可資格</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section - Mobile Optimized */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="bg-blue-100 p-3 sm:p-4 rounded-full text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section - Mobile Optimized */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  為什麼選擇我們
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  專業團隊，優質服務，值得信賴的機電工程合作夥伴
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[
                  {
                    icon: <Award className="w-8 h-8 text-blue-600" />,
                    title: '專業認證',
                    description: '持有相關專業資格及政府認可證書，確保服務質量'
                  },
                  {
                    icon: <Zap className="w-8 h-8 text-blue-600" />,
                    title: '快速響應',
                    description: '24小時內回覆，緊急情況即時處理，不讓您久等'
                  },
                  {
                    icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                    title: '收費彈性',
                    description: '可按次收費或按月收費，靈活配合您的需求'
                  }
                ].map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Preview - Mobile Optimized */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  主要服務項目
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  涵蓋機電工程、安全環保等各類專業需求
                </p>
              </div>

              {/* Service Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {[
                  {
                    title: '機電工程',
                    description: '專業驗樓、水錶申請、供水系統等',
                    icon: <Wrench className="w-8 h-8" />,
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    title: '安全服務',
                    description: '安全主任、FIOU審核、密閉空間等',
                    icon: <HardHat className="w-8 h-8" />,
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    title: '環保服務',
                    description: '環保主任、牌照申請、文件制定等',
                    icon: <Leaf className="w-8 h-8" />,
                    color: 'from-purple-500 to-purple-600'
                  }
                ].map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className={`bg-gradient-to-r ${category.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                        {category.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured Services - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {services.slice(0, 4).map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-video relative">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-blue-600 font-semibold">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-600">
                            {service.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {service.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg sm:text-xl font-bold text-blue-600">
                            {service.price}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        onClick={() => handleSectionChange('booking')}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 sm:py-3 rounded-lg transition-all duration-300"
                      >
                        立即預約
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  onClick={() => handleSectionChange('services')}
                  variant="outline"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  查看所有服務
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials - Mobile Optimized */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  客戶評價
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  聽聽客戶怎麼說我們的服務
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  {
                    name: '陳先生',
                    service: '專業驗樓',
                    location: '香港島',
                    comment: '服務專業，檢查詳細，報告清晰易懂，非常滿意！',
                    avatar: '陳'
                  },
                  {
                    name: '李太太',
                    service: '申請水錶',
                    location: '九龍',
                    comment: '處理速度快，手續簡便，省去很多麻煩。',
                    avatar: '李'
                  },
                  {
                    name: '王先生',
                    service: '村屋供水',
                    location: '新界',
                    comment: '工程質量優秀，售後服務到位，值得推薦。',
                    avatar: '王'
                  },
                  {
                    name: '黃工程師',
                    service: '安全主任服務',
                    location: '新界',
                    comment: '專業的安全監督，協助我們順利通過各項檢查。',
                    avatar: '黃'
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                          {testimonial.avatar}
                        </div>
                      </div>
                      <div className="flex justify-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed italic">
                        "{testimonial.comment}"
                      </p>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {testimonial.name}
                        </p>
                        <p className="text-xs sm:text-sm text-blue-600 font-medium">
                          {testimonial.service}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Services Section - Mobile Optimized */}
      {activeSection === 'services' && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                專業服務項目
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                提供全方位機電工程及安全環保服務
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                {
                  title: '機電工程',
                  description: '專業驗樓、水錶申請、供水系統等',
                  icon: <Wrench className="w-8 h-8" />,
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: '安全服務',
                  description: '安全主任、FIOU審核、密閉空間等',
                  icon: <HardHat className="w-8 h-8" />,
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: '環保服務',
                  description: '環保主任、牌照申請、文件制定等',
                  icon: <Leaf className="w-8 h-8" />,
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className={`bg-gradient-to-r ${category.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* All Services Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-blue-600 font-semibold">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600">
                          {service.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                          {service.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">
                          {service.price}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleSectionChange('booking')}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 sm:py-3 rounded-lg transition-all duration-300"
                    >
                      立即預約
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Section - Mobile Optimized */}
      {activeSection === 'booking' && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                預約服務
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                填寫以下表格，我們將盡快聯絡您確認詳情
              </p>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6 sm:py-8">
                <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center">
                  <Calendar className="mr-3 w-6 h-6 sm:w-8 sm:h-8" />
                  服務預約表格
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Personal Information - Mobile Optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        姓名 *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="請輸入您的姓名"
                        value={bookingForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        電話號碼 *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="請輸入您的電話號碼"
                        value={bookingForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        電郵地址 *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="請輸入您的電郵地址"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        預約日期 *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                      服務地址 *
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="請輸入服務地址"
                      value={bookingForm.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                      服務項目 *
                    </Label>
                    <select
                      id="service"
                      value={bookingForm.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      required
                      className="w-full h-12 px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">請選擇服務項目</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                      備註
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="請描述您的具體需求或其他備註..."
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="text-base resize-none"
                    />
                  </div>

                  {/* Process Steps - Mobile Optimized */}
                  <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 flex items-center">
                      <Clock className="mr-2 w-5 h-5" />
                      預約流程：
                    </h3>
                    <div className="space-y-2">
                      {[
                        '提交預約申請',
                        '我們將在24小時內聯絡您確認詳情',
                        '安排專業技術人員上門服務'
                      ].map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm sm:text-base text-blue-800">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Submit Status Messages */}
                  {submitMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 text-sm sm:text-base">{submitMessage}</p>
                      </div>
                    </div>
                  )}
                  
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800 text-sm sm:text-base">{submitError}</p>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        提交中...
                      </>
                    ) : (
                      <>
                        提交預約申請
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Additional Services - Mobile Optimized */}
            <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-blue-600" />,
                  title: '免費資詢',
                  description: '各類工程申請，工程工作，聯營合作等'
                },
                {
                  icon: <CreditCard className="w-8 sm:w-12 h-8 sm:h-12 text-blue-600" />,
                  title: '彈性收費',
                  description: '可按次收費或按月收費，靈活配合您的需求'
                },
                {
                  icon: <FileText className="w-8 sm:w-12 h-8 sm:h-12 text-blue-600" />,
                  title: '專業文件',
                  description: '提供各類安全環保文件制定及簽發服務'
                }
              ].map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-center mb-3 sm:mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Mobile Optimized */}
      {activeSection === 'contact' && (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                聯絡我們
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                隨時為您提供專業諮詢服務
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Information - Mobile Optimized */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6 sm:py-8">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    聯絡資訊
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">電話</h3>
                      <p className="text-lg sm:text-xl font-bold text-blue-600">+852 6937 4254</p>
                      <p className="text-sm text-blue-600 font-medium">24小時服務熱線</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">電郵</h3>
                      <p className="text-base sm:text-lg text-blue-600 font-medium">proemservice60@gmail.com</p>
                      <p className="text-base sm:text-lg text-blue-600 font-medium">sales@proemservices60.com</p>
                      <p className="text-sm text-blue-600 font-medium">專業諮詢信箱</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">地址</h3>
                      <p className="text-sm sm:text-base text-gray-700">香港九龍觀塘道123號</p>
                      <p className="text-sm sm:text-base text-gray-700">專業大廈15樓A室</p>
                      <p className="text-sm text-blue-600 font-medium">歡迎預約到訪</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">營業時間</h3>
                      <p className="text-sm sm:text-base text-gray-700">星期一至五：上午9時至下午6時</p>
                      <p className="text-sm sm:text-base text-gray-700">星期六：上午9時至下午1時</p>
                      <p className="text-sm sm:text-base text-gray-700">星期日及公眾假期：休息</p>
                      <p className="text-sm text-blue-600 font-medium">緊急服務24小時</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form - Mobile Optimized */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6 sm:py-8">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    發送訊息
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {/* 成功/錯誤訊息 */}
                    {contactSubmitMessage && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm sm:text-base">{contactSubmitMessage}</p>
                      </div>
                    )}
                    
                    {contactSubmitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm sm:text-base">{contactSubmitError}</p>
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="contact-name" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        姓名 *
                      </Label>
                      <Input
                        id="contact-name"
                        type="text"
                        placeholder="請輸入您的姓名"
                        className="h-12 text-base"
                        value={contactForm.name}
                        onChange={(e) => handleContactInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-email" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        電郵 *
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="請輸入您的電郵地址"
                        className="h-12 text-base"
                        value={contactForm.email}
                        onChange={(e) => handleContactInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-phone" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        電話號碼
                      </Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="請輸入您的電話號碼"
                        className="h-12 text-base"
                        value={contactForm.phone}
                        onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-message" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
                        訊息 *
                      </Label>
                      <Textarea
                        id="contact-message"
                        placeholder="請輸入您的訊息內容..."
                        rows={5}
                        className="text-base resize-none"
                        value={contactForm.message}
                        onChange={(e) => handleContactInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isContactSubmitting}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isContactSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          發送中...
                        </>
                      ) : (
                        <>
                          發送訊息
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-lg sm:text-xl font-bold">專業機電服務</span>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
                提供專業可靠的機電工程及安全環保服務，致力成為最值得信賴的合作夥伴。
              </p>
              <div className="flex flex-col space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">800+</div>
                <div className="text-sm text-gray-400">完成項目</div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">99%</div>
                <div className="text-sm text-gray-400">客戶滿意度</div>
              </div>
            </div>

            {/* Services */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">機電工程</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>專業驗樓</li>
                <li>申請水錶</li>
                <li>村屋供水</li>
                <li>分拆水錶</li>
              </ul>
            </div>

            {/* Safety & Environmental */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">安全環保</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>安全主任服務</li>
                <li>FIOU安全審核</li>
                <li>環保牌照申請</li>
                <li>密閉空間服務</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-4">聯絡資訊</h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-300">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+852 6937 4254</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>proemservice60@gmail.com</span>
                  </div>
                  <span>sales@proemservices60.com</span>
                </div>
                <div className="flex items-start justify-center sm:justify-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <div>香港九龍觀塘道123號</div>
                    <div>專業大廈15樓A室</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2025 專業機電服務有限公司，版權所有。
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

